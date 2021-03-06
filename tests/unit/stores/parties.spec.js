import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VuexPartiesModule from '@/store/modules/parties/parties';
import calculatePointsForParty from '@/store/modules/parties/calculatePointsForParty';
import cityBlockAlgorithm from '@/store/modules/algorithm/algorithms/cityblock/approve-neutral-reject';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Parties Store', () => {
  it('calculates points per party', () => {
    const party = {
      alias: 'foo',
    };

    // User position and party position are null
    let theses = [
      { status: null, factor: 1, positions: { foo: null } }, // 0
      { status: 'approve', factor: 1, positions: { foo: null } }, // 0
      { status: null, factor: 1, positions: { foo: 'approve' } }, // 0
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(0);

    // User position and party position are `skip`
    theses = [
      { status: 'skip', factor: 1, positions: { foo: null } }, // 0
      { status: 'skip', factor: 1, positions: { foo: 'approve' } }, // 0
      { status: 'approve', factor: 1, positions: { foo: 'skip' } }, // 0
      { status: 'skip', factor: 1, positions: { foo: 'skip' } }, // 0
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(0);

    // User position and party match exactly
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'approve' } }, // 2
      { status: 'neutral', factor: 1, positions: { foo: 'neutral' } }, // 2
      { status: 'reject', factor: 1, positions: { foo: 'reject' } }, // 2
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(6);

    // User position and party match exactly and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'approve' } }, // 4
      { status: 'neutral', factor: 2, positions: { foo: 'neutral' } }, // 4
      { status: 'reject', factor: 2, positions: { foo: 'reject' } }, // 4
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(12);

    // User position and party are compatible
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'neutral' } }, // 1
      { status: 'neutral', factor: 1, positions: { foo: 'approve' } }, // 1
      { status: 'reject', factor: 1, positions: { foo: 'neutral' } }, // 1
      { status: 'neutral', factor: 1, positions: { foo: 'reject' } }, // 1
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(4);

    // User position and party are compatible and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'neutral' } }, // 2
      { status: 'neutral', factor: 2, positions: { foo: 'approve' } }, // 2
      { status: 'reject', factor: 2, positions: { foo: 'neutral' } }, // 2
      { status: 'neutral', factor: 2, positions: { foo: 'reject' } }, // 2
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(8);

    // User position and party don't match at all
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'reject' } }, // 0
      { status: 'reject', factor: 1, positions: { foo: 'approve' } }, // 0
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(0);

    // User position and party don't match at all and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'reject' } }, // 0
      { status: 'reject', factor: 2, positions: { foo: 'approve' } }, // 0
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(0);

    // Theses with various statuses
    theses = [
      { status: 'approve', factor: 2, positions: { foo: null } }, // 0
      { status: 'approve', factor: 1, positions: { foo: 'approve' } }, // 2
      { status: 'reject', factor: 1, positions: { foo: 'neutral' } }, // 1
      { status: 'neutral', factor: 1, positions: { foo: 'reject' } }, // 1
      { status: 'reject', factor: 1, positions: { foo: 'reject' } }, // 2
      { status: 'reject', factor: 2, positions: { foo: 'reject' } }, // 4
      { status: 'neutral', factor: 2, positions: { foo: 'skip' } }, // 0
      { status: 'skip', factor: 1, positions: { foo: 'skip' } }, // 0
    ];
    expect(calculatePointsForParty(party, theses, cityBlockAlgorithm)).toBe(10);
  });

  it('filters selected parties', () => {
    const partyA = { alias: 'a', selected: true };
    const partyB = { alias: 'b', selected: true };
    const partyC = { alias: 'c', selected: false };
    const partyD = { alias: 'd', selected: true };

    const state = {
      parties: [partyA, partyB, partyC, partyD],
    };

    const selectedParties = VuexPartiesModule.getters.selectedParties(state);
    expect(selectedParties[0].alias).toBe('a');
    expect(selectedParties[1].alias).toBe('b');
    expect(selectedParties[2].alias).toBe('d');
  });

  it('calculates matches', () => {
    const partyA = { alias: 'a', selected: true };
    const partyB = { alias: 'b', selected: true };

    const state = {};
    const getters = {
      selectedParties: [partyA, partyB],
    };
    const rootState = {};
    const rootGetters = {
      'theses/maxPoints': 20,
      'theses/theses': [
        { status: 'approve', factor: 2, positions: { a: null, b: 'approve' } }, // a 0, b 4
        { status: 'approve', factor: 1, positions: { a: 'approve', b: 'reject' } }, // a 2, b 0
        { status: 'reject', factor: 1, positions: { a: 'neutral', b: 'skip' } }, // a 1, b 0
        { status: 'neutral', factor: 1, positions: { a: 'reject', b: 'neutral' } }, // a 1, b 2
        { status: 'reject', factor: 1, positions: { a: 'reject', b: null } }, // a 2, b 0
        { status: 'reject', factor: 2, positions: { a: 'reject', b: 'approve' } }, // a 4, b 0
        { status: 'neutral', factor: 2, positions: { a: 'skip', b: 'approve' } }, // a 0, b 2
        { status: 'skip', factor: 1, positions: { a: 'skip', b: 'neutral' } }, // a 0, b 0
      ],
      'algorithm/algorithm': cityBlockAlgorithm,
    };

    const matches = VuexPartiesModule.getters.results(state, getters, rootState, rootGetters);
    expect(matches[0].party.alias).toBe('a');
    expect(matches[0].points).toBe(10);
    expect(matches[0].percentage).toBe((1 / 20) * 10);
    expect(matches[1].party.alias).toBe('b');
    expect(matches[1].points).toBe(8);
    expect(matches[1].percentage).toBe((1 / 20) * 8);
  });
});
