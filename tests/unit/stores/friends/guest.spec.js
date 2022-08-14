import { afterEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';

const peerMock = vi.fn();

vi.mock('peerjs', () => ({
  default: peerMock,
}));
vi.useFakeTimers();

import VuexFriendsModule from '@/store/modules/friends/friends';
import VuexFriendsGuestModule from '@/store/modules/friends/guest';

const factory = () => ({
  signal: 'DISCONNECTED',
  mode: null,
  ownPeer: null,
  name: null,
  friends: [],

  // Guest-specific
  status: 'DISCONNECTED',
  hostConnection: null,
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Friends Store (Guest)', () => {
  it('provides getter and setter for `status`', () => {
    const state = factory();
    expect(VuexFriendsGuestModule.getters.status(state)).toBe('DISCONNECTED');
    VuexFriendsGuestModule.mutations.setStatus(state, 'CONNECTED');
    expect(VuexFriendsGuestModule.getters.status(state)).toBe('CONNECTED');
  });

  it('provides getter and setter for `hostConnection`', () => {
    const state = factory();
    expect(VuexFriendsGuestModule.getters.hostConnection(state)).toBeNull();
    VuexFriendsGuestModule.mutations.setHostConnection(state, {});
    expect(VuexFriendsGuestModule.getters.hostConnection(state)).toStrictEqual({});
  });

  it('allows to join a session as a guest', async () => {
    const store = createStore({
      modules: {
        friends: VuexFriendsModule,
        theses: {
          namespaced: true,
          state: {
            theses: [{ status: 'approve' }, { status: null }, { status: null }],
          },
          getters: {
            theses: (thesesState) => thesesState.theses,
          },
        },
      },
    });
    store.commit('friends/setName', 'Sophinka');

    // Mock incoming data from host
    const incomingData = {
      action: 'SEND_FRIEND_LIST_TO_GUESTS',
      payload: {
        friends: [
          {
            peerId: 'ABCDEFGH',
            profile: { name: 'Till' },
            answers: ['reject', 'neutral', null],
            dataUpdatedAt: 1630617499564,
          },
          {
            peerId: 'ABCDEFGH',
            profile: { name: 'Melody' },
            answers: ['neutral', 'approve', null],
            dataUpdatedAt: 1630617579897,
          },
        ],
      },
    };

    // Mocked peer connection to host
    const hostConnection = {
      id: null,
      on: vi.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 3000);
        if (event === 'data') setTimeout(() => handler(incomingData), 4000);
        if (event === 'close') setTimeout(handler, 5000);
      }),
      send: vi.fn(),
    };

    // Mock incoming connection (about to be closed because of guest mode)
    const incomingConnection = {
      close: vi.fn(),
    };

    // Mocked peer client
    peerMock.mockImplementation(() => ({
      on: vi.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
        if (event === 'connection') setTimeout(() => handler(incomingConnection), 2000);
      }),
      connect: vi.fn().mockImplementation((remoteId) => {
        hostConnection.id = remoteId;
        return hostConnection;
      }),
    }));

    // Wait for hostConnection to be available before triggering the next events
    const hostConnectionAvailable = new Promise((resolve) => {
      store.watch(
        (storeState, getters) => getters['friends/guest/hostConnection'],
        () => {
          if (store.getters['friends/guest/hostConnection'] !== null) resolve();
        }
      );
    });

    // Now trigger the main function
    const dispatch = store.dispatch('friends/guest/joinSession', { remoteId: 'abcdefgh' });

    vi.advanceTimersToNextTimer(); // triggers the open-event of the peer client
    await hostConnectionAvailable;

    vi.advanceTimersToNextTimer(); // triggers the connection-event
    expect(incomingConnection.close).toHaveBeenCalled();

    vi.advanceTimersToNextTimer(); // triggers the open-event of the host connection
    await dispatch;

    expect(store.getters['friends/mode']).toBe('GUEST');
    expect(store.getters['friends/guest/status']).toBe('OPEN');
    expect(store.getters['friends/guest/hostConnection'].id).toBe('abcdefgh');
    expect(await dispatch).toStrictEqual(hostConnection);
    expect(hostConnection.send).toHaveBeenNthCalledWith(1, {
      action: 'SEND_PROFILE_TO_HOST',
      payload: { name: 'Sophinka' },
    });
    expect(hostConnection.send).toHaveBeenNthCalledWith(2, {
      action: 'SEND_ANSWERS_TO_HOST',
      payload: ['approve', null, null],
    });

    // Trigger the data-event of the host connection (incoming guest list)
    vi.advanceTimersToNextTimer();
    expect(store.getters['friends/friends']).toStrictEqual(incomingData.payload.friends);

    // Trigger the close-event of the host connection
    vi.advanceTimersToNextTimer();
    expect(store.getters['friends/guest/status']).toBe('DISCONNECTED');
  });

  it('sends own profile to host when in guest mode', () => {
    const hostConnection = { send: vi.fn() };

    // Don't do this when disconnected
    VuexFriendsGuestModule.actions.sendProfileToHost({
      getters: {
        status: 'DISCONNECTED',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': null,
        'friends/name': 'Sophinka',
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Don't do this in no mode
    VuexFriendsGuestModule.actions.sendProfileToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': null,
        'friends/name': 'Sophinka',
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Don't do this in host mode
    VuexFriendsGuestModule.actions.sendProfileToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': 'HOST',
        'friends/name': 'Sophinka',
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Send profile to host
    VuexFriendsGuestModule.actions.sendProfileToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': 'GUEST',
        'friends/name': 'Sophinka',
      },
    });
    expect(hostConnection.send).toHaveBeenCalledWith({
      action: 'SEND_PROFILE_TO_HOST',
      payload: { name: 'Sophinka' },
    });
  });

  it('sends answers to host when in guest mode', () => {
    const hostConnection = { send: vi.fn() };

    // Don't do this when disconnected
    VuexFriendsGuestModule.actions.sendAnswersToHost({
      getters: {
        status: 'DISCONNECTED',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': null,
        'friends/answers': ['approve', 'reject', null],
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Don't do this in no mode
    VuexFriendsGuestModule.actions.sendAnswersToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': null,
        'friends/answers': ['approve', 'reject', null],
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Don't do this in host mode
    VuexFriendsGuestModule.actions.sendAnswersToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': 'HOST',
        'friends/answers': ['approve', 'reject', null],
      },
    });
    expect(hostConnection.send).not.toHaveBeenCalled();

    // Send profile to host
    VuexFriendsGuestModule.actions.sendAnswersToHost({
      getters: {
        status: 'OPEN',
        hostConnection,
      },
      rootGetters: {
        'friends/mode': 'GUEST',
        'friends/answers': ['approve', 'reject', null],
      },
    });
    expect(hostConnection.send).toHaveBeenCalledWith({
      action: 'SEND_ANSWERS_TO_HOST',
      payload: ['approve', 'reject', null],
    });
  });
});
