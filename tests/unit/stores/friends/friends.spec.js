import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Peer from 'peerjs';
import VuexFriendsModule from '@/store/modules/friends/friends';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('peerjs');
jest.useFakeTimers();

const factory = () => ({
  signal: 'DISCONNECTED',
  mode: null,
  ownPeer: null,
  name: null,
  friends: [],
});

const friendFactory = (peerId, status = 'CONNECTED', accepted = false) => ({
  peerId,
  status,
  accepted,
  profile: {
    name: null,
  },
  connection: {},
});

beforeEach(() => {
  Peer.mockClear();
});

describe('Friends Store (General)', () => {
  it('provides getter and setter for `signal`', () => {
    const state = factory();
    expect(VuexFriendsModule.getters.signal(state)).toBe('DISCONNECTED');
    VuexFriendsModule.mutations.setSignal(state, 'CONNECTED');
    expect(VuexFriendsModule.getters.signal(state)).toBe('CONNECTED');
  });

  it('provides getter and setter for `mode`', () => {
    const state = factory();
    expect(VuexFriendsModule.getters.mode(state)).toBeNull();
    VuexFriendsModule.mutations.setMode(state, 'HOST');
    expect(VuexFriendsModule.getters.mode(state)).toBe('HOST');
  });

  it('provides getter and setter for `name`', () => {
    const state = factory();
    expect(VuexFriendsModule.getters.name(state)).toBeNull();
    VuexFriendsModule.mutations.setName(state, 'Sophinka');
    expect(VuexFriendsModule.getters.name(state)).toBe('Sophinka');
  });

  it('provides getter for `friends`', () => {
    const state = factory();
    state.friends = [
      friendFactory('ABCDEFG1'),
      friendFactory('ABCDEFG2'),
      friendFactory('ABCDEFG3'),
    ];
    expect(VuexFriendsModule.getters.friends(state)).toStrictEqual(state.friends);
    const newFriends = [
      friendFactory('ABCDEFG4'),
      friendFactory('ABCDEFG5'),
    ];
    VuexFriendsModule.mutations.overwriteFriends(state, { friends: newFriends });
    expect(VuexFriendsModule.getters.friends(state)).toStrictEqual(newFriends);
    VuexFriendsModule.mutations.clearFriends(state);
    expect(VuexFriendsModule.getters.friends(state)).toStrictEqual([]);
  });

  it('provides getter and setter for `answers`', () => {
    const state = factory();
    const rootGetters = {
      'theses/theses': [
        { status: 'approve' },
        { status: 'approve' },
        { status: 'reject' },
        { status: 'skip' },
      ],
    };
    expect(VuexFriendsModule.getters.answers(state, {}, {}, rootGetters))
      .toStrictEqual(['approve', 'approve', 'reject', 'skip']);
  });

  it('creates a peer and waits for connection to open and close, while setting the signal accordingly', async () => {
    const store = new Vuex.Store({
      modules: {
        friends: VuexFriendsModule,
      },
    });
    Peer.mockImplementation(() => ({
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
        if (event === 'disconnected') setTimeout(handler, 2000);
      }),
    }));

    // Open connection
    const dispatch = store.dispatch('friends/createOwnPeer', { force: false });
    expect(store.getters['friends/signal']).toBe('CONNECTING');

    // Try to open another connection
    const dispatchAgain = store.dispatch('friends/createOwnPeer', { force: false });
    jest.advanceTimersToNextTimer();
    await dispatch;
    await dispatchAgain;
    expect(Peer).toHaveBeenCalledTimes(1);

    // Close connection
    jest.advanceTimersToNextTimer();
    expect(store.getters['friends/signal']).toBe('DISCONNECTED');
  });
});
