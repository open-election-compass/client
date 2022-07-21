import { customAlphabet } from 'nanoid';
import Peer from 'peerjs';
import guest from './guest';
import host from './host';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

export default {
  namespaced: true,
  modules: {
    guest,
    host,
  },
  state: {
    /**
     * Status of the connection to the signalling server.
     * 'DISCONNECTED' | 'CONNECTING' | 'OPEN'
     */
    signal: 'DISCONNECTED',
    mode: null, // null | 'GUEST' | 'HOST'
    ownPeer: null,
    name: null,
    friends: [], // { peerId, status, accepted, profile, connection }
  },
  getters: {
    signal({ signal }) {
      return signal;
    },
    mode({ mode }) {
      return mode;
    },
    ownPeer({ ownPeer }) {
      return ownPeer;
    },
    name({ name }) {
      return name;
    },
    friends({ friends }) {
      return friends;
    },
    answers(state, getters, rootState, rootGetters) {
      return rootGetters['theses/theses'].map((thesis) => thesis.status);
    },
  },
  mutations: {
    setSignal(state, signal) {
      state.signal = signal;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setOwnPeer(state, peer) {
      state.ownPeer = peer;
    },
    setName(state, name) {
      state.name = name;
    },
    overwriteFriends(state, { friends }) {
      state.friends = friends;
    },
    clearFriends(state) {
      state.friends = [];
    },
  },
  actions: {
    /**
     * Creates a new Peer with a random ID using peer.js. This is necessary to either host a session
     * or join a session. The connection status of this Peer is made available in the signal prop.
     */
    createOwnPeer({ commit, getters, rootGetters }, { force }) {
      return new Promise((resolve) => {
        // Check for existing Peer.js instance
        if (['CONNECTING', 'CONNECTED'].includes(getters.signal) && force !== true) {
          resolve(getters.ownPeer);
          return;
        }

        // Initialize new Peer.js instance
        commit('setSignal', 'CONNECTING');
        const ownPeer = new Peer(nanoid(), rootGetters['options/friendsConfig']);
        commit('setOwnPeer', ownPeer);

        // Is connection to signalling server open?
        ownPeer.on('open', () => {
          commit('setSignal', 'OPEN');
          resolve(getters.ownPeer);
        });

        // Is connection to signalling server lost?
        ownPeer.on('disconnected', () => {
          commit('setSignal', 'DISCONNECTED');
        });
      });
    },
  },
};
