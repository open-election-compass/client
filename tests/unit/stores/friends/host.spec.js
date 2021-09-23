import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Peer from 'peerjs';
import cloneDeep from 'lodash/cloneDeep';
import VuexFriendsModule from '@/store/modules/friends/friends';
import VuexFriendsHostModule from '@/store/modules/friends/host';

jest.mock('peerjs');

const factory = () => ({
  signal: 'DISCONNECTED',
  mode: null,
  ownPeer: null,
  name: null,
  friends: [],

  // Host-specific
  guests: [],
  ownDataUpdatedAt: null,
});

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(Date.prototype, 'getTime').mockReturnValue(123);
});

afterEach(() => {
  Peer.mockClear();
  jest.clearAllTimers();
  jest.resetAllMocks();
});

describe('Friends Store (Host)', () => {
  it('provides getter for `guests`', () => {
    const state = factory();
    expect(VuexFriendsHostModule.getters.guests(state)).toStrictEqual([]);
  });

  it('provides getter and setter for `ownDataUpdatedAt`', () => {
    const state = factory();
    expect(VuexFriendsHostModule.getters.ownDataUpdatedAt(state)).toBeNull();
    VuexFriendsHostModule.mutations.ownDataUpdatedNow(state);
    expect(VuexFriendsHostModule.getters.ownDataUpdatedAt(state)).toBe(123);
  });

  it('adds guest to state', () => {
    const state = factory();
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    expect(state.guests).toHaveLength(1);
    expect(state.guests[0].peerId).toBe('abc');
    expect(state.guests[0].connectionStatus).toBe('CONNECTING');
    expect(state.guests[0].connection.foo).toBe('bar');

    // Adding same guest again
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'baz' });
    expect(state.guests).toHaveLength(1);
    expect(state.guests[0].connection.foo).toBe('baz');
  });

  it('updates a guest\'s profile', () => {
    const state = factory();
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    expect(state.guests[0].profile.name).toBeNull();

    let result = VuexFriendsHostModule.mutations.updateGuestProfile(state, { peerId: 'abc', profile: { name: 'Sophinka' } });
    expect(result).toBe(true);
    expect(state.guests[0].profile.name).toBe('Sophinka');

    result = VuexFriendsHostModule.mutations.updateGuestProfile(state, { peerId: 'def', profile: { name: 'Joscha' } });
    expect(result).toBe(false);
  });

  it('updates a guest\'s answers', () => {
    const state = factory();
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    expect(state.guests[0].answers).toStrictEqual([]);

    let result = VuexFriendsHostModule.mutations.updateGuestAnswers(state, { peerId: 'abc', answers: ['approve', null] });
    expect(result).toBe(true);
    expect(state.guests[0].answers).toStrictEqual(['approve', null]);

    result = VuexFriendsHostModule.mutations.updateGuestAnswers(state, { peerId: 'def', answers: ['approve', null] });
    expect(result).toBe(false);
  });

  it('updates a guest\'s connection status', () => {
    const state = factory();
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    expect(state.guests[0].connectionStatus).toBe('CONNECTING');

    let result = VuexFriendsHostModule.mutations.updateGuestConnectionStatus(state, { peerId: 'abc', connectionStatus: 'CONNECTED' });
    expect(result).toBe(true);
    expect(state.guests[0].connectionStatus).toBe('CONNECTED');

    result = VuexFriendsHostModule.mutations.updateGuestConnectionStatus(state, { peerId: 'def', connectionStatus: 'CONNECTED' });
    expect(result).toBe(false);
  });

  it('accepts guests', () => {
    const state = factory();
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    expect(state.guests[0].accepted).toBe(false);

    let result = VuexFriendsHostModule.mutations.acceptGuest(state, { peerId: 'abc' });
    expect(result).toBe(true);
    expect(state.guests[0].accepted).toBe(true);

    result = VuexFriendsHostModule.mutations.acceptGuest(state, { peerId: 'def' });
    expect(result).toBe(false);
  });

  it('clears guests', () => {
    const state = factory();
    expect(state.guests).toHaveLength(0);
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'abc', foo: 'bar' });
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'def', foo: 'bar' });
    VuexFriendsHostModule.mutations.addGuest(state, { peer: 'ghi', foo: 'bar' });
    expect(state.guests).toHaveLength(3);

    VuexFriendsHostModule.mutations.clearGuests(state);
    expect(state.guests).toHaveLength(0);
  });

  it('hosts a session', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      modules: {
        friends: cloneDeep(VuexFriendsModule),
      },
    });
    Peer.mockImplementation(() => ({
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
      }),
    }));

    // Add pre-existing guest
    store.commit('friends/host/addGuest', { peer: 'abc', foo: 'bar' });
    expect(store.getters['friends/host/guests']).toHaveLength(1);

    const dispatch = store.dispatch('friends/host/hostSession');
    jest.advanceTimersToNextTimer();
    await dispatch;
    expect(store.getters['friends/mode']).toEqual('HOST');
    expect(store.getters['friends/host/guests']).toHaveLength(0);
  });

  it('adds guest connections', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      modules: {
        friends: cloneDeep(VuexFriendsModule),
      },
    });
    const fakeGuestConnection = {
      peer: 'xyz',
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 3000);
        if (event === 'close') setTimeout(handler, 4000);
      }),
    };
    Peer.mockImplementation(() => ({
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
        if (event === 'connection') setTimeout(() => handler(fakeGuestConnection), 2000);
      }),
    }));

    const dispatch = store.dispatch('friends/host/hostSession');
    jest.advanceTimersToNextTimer(); // create peer
    await dispatch;

    jest.advanceTimersToNextTimer(); // incoming guest connection
    expect(store.getters['friends/host/guests']).toHaveLength(1);
    expect(store.getters['friends/host/guests'][0].peerId).toBe('xyz');
    expect(store.getters['friends/host/guests'][0].connectionStatus).toBe('CONNECTING');

    jest.advanceTimersToNextTimer(); // open guest connection
    expect(store.getters['friends/host/guests'][0].connectionStatus).toBe('CONNECTED');

    jest.advanceTimersToNextTimer(); // close guest connection
    expect(store.getters['friends/host/guests'][0].connectionStatus).toBe('DISCONNECTED');
  });

  it('receives updates of guest profiles and answers', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      modules: {
        friends: cloneDeep(VuexFriendsModule),
      },
    });

    const incomingProfileChange = {
      action: 'SEND_PROFILE_TO_HOST',
      payload: { name: 'Sophinka' },
    };

    const incomingAnswerChange = {
      action: 'SEND_ANSWERS_TO_HOST',
      payload: ['approve', 'skip'],
    };

    const fakeGuestConnection = {
      peer: 'xyz',
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 3000);
        if (event === 'data') {
          setTimeout(() => handler(incomingProfileChange), 4000);
          setTimeout(() => handler(incomingAnswerChange), 5000);
        }
      }),
    };
    Peer.mockImplementation(() => ({
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
        if (event === 'connection') setTimeout(() => handler(fakeGuestConnection), 2000);
      }),
    }));

    const dispatch = store.dispatch('friends/host/hostSession');
    jest.advanceTimersToNextTimer(); // create peer
    await dispatch;

    jest.advanceTimersToNextTimer(); // incoming guest connection
    jest.advanceTimersToNextTimer(); // open guest connection

    // Test receiving of guest profiles
    expect(store.getters['friends/host/guests'][0].profile.name).toBeNull();
    jest.advanceTimersToNextTimer(); // trigger incoming profile change
    expect(store.getters['friends/host/guests'][0].profile.name).toBe('Sophinka');

    // Test receiving of guest answers
    expect(store.getters['friends/host/guests'][0].answers).toStrictEqual([]);
    jest.advanceTimersToNextTimer(); // trigger incoming answers
    expect(store.getters['friends/host/guests'][0].answers).toStrictEqual(['approve', 'skip']);
  });

  it('sends updates to guests', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      modules: {
        friends: cloneDeep(VuexFriendsModule),
        theses: {
          namespaced: true,
          state: {
            theses: [
              { status: 'approve' },
              { status: null },
              { status: null },
            ],
          },
          getters: {
            theses: (thesesState) => thesesState.theses,
          },
        },
      },
    });

    Peer.mockImplementation(() => ({
      id: 'xyz',
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'open') setTimeout(handler, 1000);
      }),
    }));

    const dispatch = store.dispatch('friends/host/hostSession');
    jest.advanceTimersToNextTimer(); // create peer
    await dispatch;

    store.commit('friends/setName', 'Till');

    const sendFunctionABC = jest.fn();
    store.commit('friends/host/addGuest', { peer: 'abc', send: sendFunctionABC });
    store.commit('friends/host/updateGuestConnectionStatus', { peerId: 'abc', connectionStatus: 'CONNECTED' });
    store.commit('friends/host/updateGuestProfile', { peerId: 'abc', profile: { name: 'Sophinka' } });
    store.commit('friends/host/updateGuestAnswers', { peerId: 'abc', answers: ['approve', null, null] });
    store.commit('friends/host/acceptGuest', { peerId: 'abc' });

    const sendFunctionDEF = jest.fn();
    store.commit('friends/host/addGuest', { peer: 'def', send: sendFunctionDEF });
    store.commit('friends/host/updateGuestConnectionStatus', { peerId: 'def', connectionStatus: 'CONNECTED' });
    store.commit('friends/host/updateGuestProfile', { peerId: 'def', profile: { name: 'Jonas' } });
    store.commit('friends/host/updateGuestAnswers', { peerId: 'def', answers: ['reject', 'skip', null] });
    store.commit('friends/host/acceptGuest', { peerId: 'def' });

    const sendFunctionGHI = jest.fn();
    store.commit('friends/host/addGuest', { peer: 'ghi', send: sendFunctionGHI });
    store.commit('friends/host/updateGuestConnectionStatus', { peerId: 'ghi', connectionStatus: 'CONNECTING' });
    store.commit('friends/host/updateGuestProfile', { peerId: 'ghi', profile: { name: 'Anna' } });
    store.commit('friends/host/updateGuestAnswers', { peerId: 'ghi', answers: ['reject', 'skip', null] });
    store.commit('friends/host/acceptGuest', { peerId: 'ghi' });

    const sendFunctionJKL = jest.fn();
    store.commit('friends/host/addGuest', { peer: 'jkl', send: sendFunctionJKL });
    store.commit('friends/host/updateGuestConnectionStatus', { peerId: 'jkl', connectionStatus: 'CONNECTED' });
    store.commit('friends/host/updateGuestProfile', { peerId: 'jkl', profile: { name: 'Joscha' } });
    store.commit('friends/host/updateGuestAnswers', { peerId: 'jkl', answers: [null, null, null] });
    // -> Joscha hasn't been accepted yet

    expect(store.getters['friends/mode']).toEqual('HOST');
    expect(store.getters['friends/host/guests']).toHaveLength(4);

    // Attempt to send updates in the wrong mode
    store.commit('friends/setMode', null);
    store.dispatch('friends/host/sendUpdateToAllGuests');
    expect(sendFunctionABC).toHaveBeenCalledTimes(0);

    // Correct mode and try again
    store.commit('friends/setMode', 'HOST');
    store.dispatch('friends/host/sendUpdateToAllGuests');

    expect(sendFunctionABC).toHaveBeenCalledTimes(1);
    expect(sendFunctionDEF).toHaveBeenCalledTimes(1);
    expect(sendFunctionGHI).toHaveBeenCalledTimes(0); // -> not yet accepted
    expect(sendFunctionJKL).toHaveBeenCalledTimes(0); // -> not yet connected

    expect(sendFunctionABC).toHaveBeenCalledWith({
      action: 'SEND_FRIEND_LIST_TO_GUESTS',
      payload: {
        friends: [
          {
            answers: ['approve', null, null],
            dataUpdatedAt: null,
            peerId: 'xyz', // -> HOST
            profile: { name: 'Till' },
          },
          {
            answers: ['approve', null, null],
            dataUpdatedAt: 123,
            peerId: 'abc',
            profile: { name: 'Sophinka' },
          },
          {
            answers: ['reject', 'skip', null],
            dataUpdatedAt: 123,
            peerId: 'def',
            profile: { name: 'Jonas' },
          },
          {
            answers: ['reject', 'skip', null],
            dataUpdatedAt: 123,
            peerId: 'ghi',
            profile: { name: 'Anna' },
          },
        ],
      },
    });
  });
});
