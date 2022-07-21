import { incomingDataSchema, friendsSchema } from './schemas';

export default {
  namespaced: true,
  state: {
    /**
     * Status of the connection to the host (friend); relevant if friends/mode = 'GUEST'.
     * 'DISCONNECTED' | 'CONNECTING' | 'OPEN'
     */
    status: 'DISCONNECTED',
    hostConnection: null,
  },
  getters: {
    status({ status }) {
      return status;
    },
    hostConnection({ hostConnection }) {
      return hostConnection;
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setHostConnection(state, connection) {
      state.hostConnection = connection;
    },
  },
  actions: {
    /**
     * Join a session by reference of it's peer ID. Create an own peer first, if it doesn't exist
     * and then attach listeners for incoming data transfers (updates to friends, profiles,
     * answers).
     */
    joinSession({ commit, dispatch, rootGetters }, { remoteId }) {
      return new Promise((resolve, reject) => {
        commit('friends/setMode', 'GUEST', { root: true });
        commit({ type: 'friends/clearFriends' }, { root: true });
        commit('setStatus', 'CONNECTING');

        dispatch('friends/createOwnPeer', { force: false }, { root: true })
          .then((ownPeer) => {
            // Immediately close incoming connections in guest mode
            ownPeer.on('connection', (incomingConnection) => {
              incomingConnection.close();
            });

            // Connect to host
            const hostConnection = ownPeer.connect(remoteId);
            commit('setHostConnection', hostConnection);

            // Is connection to host open?
            hostConnection.on('open', () => {
              commit('setStatus', 'OPEN');
              dispatch('sendProfileToHost');
              dispatch('sendAnswersToHost');
              resolve(hostConnection);
            });

            // Listen for updates
            hostConnection.on('data', (incomingData) => {
              incomingDataSchema.validateSync(incomingData);
              if (
                incomingData.action === 'SEND_FRIEND_LIST_TO_GUESTS' &&
                rootGetters['friends/mode'] === 'GUEST'
              ) {
                const friends = friendsSchema.validateSync(incomingData.payload.friends);
                commit('friends/overwriteFriends', { friends }, { root: true });
              }
            });

            // Is connection to host lost?
            hostConnection.on('close', () => {
              commit('setStatus', 'DISCONNECTED');
              reject(new Error('Connection closed.'));
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * Send the complete profile to the host peer for distribution.
     */
    sendProfileToHost({ getters, rootGetters }) {
      const { status, hostConnection } = getters;
      const mode = rootGetters['friends/mode'];
      const name = rootGetters['friends/name'];
      if (mode === 'GUEST' && hostConnection !== null && status === 'OPEN') {
        hostConnection.send({ action: 'SEND_PROFILE_TO_HOST', payload: { name } });
      }
    },

    /**
     * Send the answers to the host peer for distribution.
     */
    sendAnswersToHost({ getters, rootGetters }) {
      const { status, hostConnection } = getters;
      const mode = rootGetters['friends/mode'];
      const answers = rootGetters['friends/answers'];
      if (mode === 'GUEST' && hostConnection !== null && status === 'OPEN') {
        hostConnection.send({ action: 'SEND_ANSWERS_TO_HOST', payload: answers });
      }
    },
  },
};
