import { incomingDataSchema, friendProfileSchema, friendAnswersSchema } from './schemas';

export default {
  namespaced: true,
  state: {
    guests: [],
    ownDataUpdatedAt: null,
  },
  getters: {
    guests({ guests }) {
      return guests;
    },
    ownDataUpdatedAt({ ownDataUpdatedAt }) {
      return ownDataUpdatedAt;
    },
  },
  mutations: {
    ownDataUpdatedNow(state) {
      state.ownDataUpdatedAt = new Date().getTime();
    },

    /**
     * Add a new guest peer connection to the store and initialize it's properties. Profile and
     * answers are set via updates, once the connection is established. Guests are not accepted
     * automatically.
     */
    addGuest(state, incomingConnection) {
      // If guest has connected before, update the connection
      const existing = state.guests.find((guest) => guest.peerId === incomingConnection.peer);
      if (existing) {
        existing.connection = incomingConnection;
        return;
      }

      // Add new guest to the list
      state.guests.push({
        peerId: incomingConnection.peer,
        connectionStatus: 'CONNECTING', // 'CONNECTED' | 'DISCONNECTED'
        accepted: false,
        profile: {
          name: null,
        },
        answers: [],
        connection: incomingConnection,
        dataUpdatedAt: new Date().getTime(),
      });
    },

    /**
     * Update the profile of a given guest after receiving an update from that peer. Returns false
     * if guest connection is not found.
     */
    updateGuestProfile(state, { peerId, profile }) {
      const existing = state.guests.find((guest) => guest.peerId === peerId);
      if (!existing) {
        return false;
      }
      Object.assign(existing.profile, profile);
      existing.dataUpdatedAt = new Date().getTime();
      return true;
    },

    /**
     * Update answers of a given guest after receiving an update from that peer. Returns false if
     * guest connection is not found.
     */
    updateGuestAnswers(state, { peerId, answers }) {
      const existing = state.guests.find((guest) => guest.peerId === peerId);
      if (!existing) {
        return false;
      }
      Object.assign(existing.answers, answers);
      existing.dataUpdatedAt = new Date().getTime();
      return true;
    },

    /**
     * Update the connection status of a given guest after receiving an update from that peer.
     * Returns false if guest connection is not found.
     */
    updateGuestConnectionStatus(state, { peerId, connectionStatus }) {
      const existing = state.guests.find((guest) => guest.peerId === peerId);
      if (!existing) {
        return false;
      }
      existing.connectionStatus = connectionStatus;
      return true;
    },

    /**
     * Sets the acceptance status of a given guest to true and thereby allows updates to be sent to
     * that connection. Returns false if guest connection is not found.
     */
    acceptGuest(state, { peerId }) {
      const existing = state.guests.find((guest) => guest.peerId === peerId);
      if (!existing) {
        return false;
      }
      existing.accepted = true;
      return true;
    },

    clearGuests(state) {
      state.guests = [];
    },
  },
  actions: {
    /**
     * Start a new hosted session, create an own peer if necessary and start listening to incoming
     * connections.
     */
    hostSession({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('friends/setMode', 'HOST', { root: true });
        commit({ type: 'friends/clearFriends' }, { root: true });
        commit('clearGuests');

        dispatch('friends/createOwnPeer', { force: false }, { root: true })
          .then((ownPeer) => {
            ownPeer.on('connection', (incomingConnection) => {
              dispatch('addGuest', { incomingConnection });
            });
            resolve(ownPeer);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * Add a new incoming connection to list of guests and start listening to incoming updates on
     * profile, answers or connection status.
     */
    addGuest({ commit }, { incomingConnection }) {
      commit('addGuest', incomingConnection);

      // Process incoming data
      incomingConnection.on('data', (incomingData) => {
        incomingDataSchema.validateSync(incomingData);
        if (incomingData.action === 'SEND_PROFILE_TO_HOST') {
          const friendProfile = friendProfileSchema.validateSync(incomingData.payload);
          commit('updateGuestProfile', { peerId: incomingConnection.peer, profile: friendProfile });
        } else if (incomingData.action === 'SEND_ANSWERS_TO_HOST') {
          const friendAnswers = friendAnswersSchema.validateSync(incomingData.payload);
          commit('updateGuestAnswers', { peerId: incomingConnection.peer, answers: friendAnswers });
        }
      });

      // Keep tabs on connection
      incomingConnection.on('open', () => {
        commit('updateGuestConnectionStatus', {
          peerId: incomingConnection.peer,
          connectionStatus: 'CONNECTED',
        });
      });
      incomingConnection.on('close', () => {
        commit('updateGuestConnectionStatus', {
          peerId: incomingConnection.peer,
          connectionStatus: 'DISCONNECTED',
        });
      });
    },

    /**
     * In host mode, send a list of all (accepted and connected) friends, including the host itself
     * to all friends (again, accepted and connected), containing the profile and answers.
     */
    sendUpdateToAllGuests({ commit, getters, rootGetters }) {
      const { guests, ownDataUpdatedAt } = getters;
      if (rootGetters['friends/mode'] !== 'HOST') {
        return;
      }
      // Filter guests and omit some details
      const friends = guests
        .filter((guest) => guest.accepted)
        .map((guest) => ({
          peerId: guest.peerId,
          profile: guest.profile,
          answers: guest.answers,
          dataUpdatedAt: guest.dataUpdatedAt,
        }));

      // Add host to list of friends, since it is not part of the guests array.
      friends.unshift({
        peerId: rootGetters['friends/ownPeer'].id,
        profile: {
          name: rootGetters['friends/name'],
        },
        answers: rootGetters['friends/answers'],
        dataUpdatedAt: ownDataUpdatedAt,
      });

      // Send updated friend list to all guests
      guests
        .filter((guest) => guest.accepted)
        .forEach((guest) => {
          if (guest.connectionStatus === 'CONNECTED') {
            guest.connection.send({ action: 'SEND_FRIEND_LIST_TO_GUESTS', payload: { friends } });
          }
        });

      // Update own friend list
      commit('friends/overwriteFriends', { friends }, { root: true });
    },
  },
};
