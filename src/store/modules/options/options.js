export default {
  namespaced: true,
  state: {
    kioskMode: false,
    friendsEnabled: false,
    friendsHost: 'friends.open-election-compass.com',
    friendsPort: 443,
    friendsPath: '/',
  },
  getters: {
    kioskMode(state) {
      return state.kioskMode;
    },
    friendsEnabled(state) {
      return state.friendsEnabled;
    },
    friendsConfig(state) {
      return {
        host: state.friendsHost,
        port: state.friendsPort,
        path: state.friendsPath,
        secure: true,
      };
    },
  },
  mutations: {
    setKioskMode(state, value) {
      state.kioskMode = value;
    },
    setFriendsEnabled(state, value) {
      state.friendsEnabled = value;
    },
    setFriendsHost(state, value) {
      state.friendsHost = value;
    },
    setFriendsPort(state, value) {
      state.friendsPort = value;
    },
    setFriendsPath(state, value) {
      state.friendsPath = value;
    },
  },
};
