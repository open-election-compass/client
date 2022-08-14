export default function friendsPlugin(store) {
  // Attach listeners to automatically send updated friend list to all friends, whenever a profile,
  // answers or acceptance status changes
  store.subscribe((mutation) => {
    const watch = [
      'friends/host/addGuest',
      'friends/host/updateGuestProfile',
      'friends/host/updateGuestAnswers',
      'friends/host/acceptGuest',
    ];
    if (store.getters['friends/mode'] === 'HOST' && watch.includes(mutation.type)) {
      store.dispatch('friends/host/sendUpdateToAllGuests');
    }
  });

  // Attach listeners to update the timestamp of when the own name, mode or answers were last
  // changed
  store.subscribe((mutation) => {
    const watch = ['friends/setName', 'friends/setMode', 'theses/setStatus'];
    if (store.getters['friends/mode'] === 'HOST' && watch.includes(mutation.type)) {
      store.commit('friends/host/ownDataUpdatedNow');
    }
  });

  // Attach listener to send answers to host / guests whenever the own answers change
  store.watch(
    (state, getters) => getters['friends/answers'],
    () => {
      if (store.getters['friends/mode'] === 'GUEST') {
        store.dispatch('friends/guest/sendAnswersToHost');
      }
      if (store.getters['friends/mode'] === 'HOST') {
        store.dispatch('friends/host/sendUpdateToAllGuests');
      }
    },
    { deep: true }
  );
}
