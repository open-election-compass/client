import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VuexPartyModule from '@/store/modules/parties';
import VuexThesesModule from '@/store/modules/theses';
import PageSection from '@/components/elements/PageSection.vue';
import MatchSection from '@/components/views/home/sections/05-match/MatchSection.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('page-section', PageSection);

describe('MatchSection.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        parties: VuexPartyModule,
        theses: VuexThesesModule,
      },
    });
    wrapper = shallowMount(MatchSection, {
      localVue,
      store,
      mocks: {
        $t: () => {},
      },
    });
  });

  it('calculates result', () => {

    // Theses with no status
    let theses = [
      { status: null, factor: 1 }, // 0
      { status: null, factor: 1 }, // 0
      { status: null, factor: 2 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(0);

    // Theses with status `skip`
    theses = [
      { status: 'skip', factor: 1 }, // 0
      { status: 'skip', factor: 2 }, // 0
      { status: null, factor: 2 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(0);

    // Theses with status `approve`
    theses = [
      { status: 'approve', factor: 1 }, // 2
      { status: 'approve', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(4);

    // Theses with status `approve` and an important flag
    theses = [
      { status: 'approve', factor: 1 }, // 2
      { status: 'approve', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(6);

    // Theses with status `neutral`
    theses = [
      { status: 'neutral', factor: 1 }, // 2
      { status: 'neutral', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(4);

    // Theses with status `neutral` and an important flag
    theses = [
      { status: 'neutral', factor: 1 }, // 2
      { status: 'neutral', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(6);

    // Theses with status `reject`
    theses = [
      { status: 'reject', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(4);

    // Theses with status `reject` and an important flag
    theses = [
      { status: 'reject', factor: 1 }, // 2
      { status: 'reject', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(6);

    // Theses with various statuses
    theses = [
      { status: 'approve', factor: 2 }, // 4
      { status: 'approve', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'neutral', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'neutral', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(wrapper.vm.calculateMaxPoints(theses)).to.equal(16);
  });

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
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(0);

    // User position and party position are `skip`
    theses = [
      { status: 'skip', factor: 1, positions: { foo: null } }, // 0
      { status: 'skip', factor: 1, positions: { foo: 'approve' } }, // 0
      { status: 'approve', factor: 1, positions: { foo: 'skip' } }, // 0
      { status: 'skip', factor: 1, positions: { foo: 'skip' } }, // 0
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(0);

    // User position and party match exactly
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'approve' } }, // 2
      { status: 'neutral', factor: 1, positions: { foo: 'neutral' } }, // 2
      { status: 'reject', factor: 1, positions: { foo: 'reject' } }, // 2
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(6);

    // User position and party match exactly and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'approve' } }, // 4
      { status: 'neutral', factor: 2, positions: { foo: 'neutral' } }, // 4
      { status: 'reject', factor: 2, positions: { foo: 'reject' } }, // 4
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(12);

    // User position and party are compatible
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'neutral' } }, // 1
      { status: 'neutral', factor: 1, positions: { foo: 'approve' } }, // 1
      { status: 'reject', factor: 1, positions: { foo: 'neutral' } }, // 1
      { status: 'neutral', factor: 1, positions: { foo: 'reject' } }, // 1
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(4);

    // User position and party are compatible and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'neutral' } }, // 2
      { status: 'neutral', factor: 2, positions: { foo: 'approve' } }, // 2
      { status: 'reject', factor: 2, positions: { foo: 'neutral' } }, // 2
      { status: 'neutral', factor: 2, positions: { foo: 'reject' } }, // 2
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(8);

    // User position and party don't match at all
    theses = [
      { status: 'approve', factor: 1, positions: { foo: 'reject' } }, // 0
      { status: 'reject', factor: 1, positions: { foo: 'approve' } }, // 0
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(0);

    // User position and party don't match at all and theses are important
    theses = [
      { status: 'approve', factor: 2, positions: { foo: 'reject' } }, // 0
      { status: 'reject', factor: 2, positions: { foo: 'approve' } }, // 0
    ];
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(0);

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
    expect(wrapper.vm.calculatePointsForParty(party, theses)).to.equal(10);
  });

  it('calculates matches', () => {

    const parties = [
      { alias: 'foo' },
      { alias: 'bar' },
    ];

    const theses = [
      { status: 'approve', factor: 2, positions: { foo: null, bar: 'approve' } }, // foo 0, bar 4
      { status: 'approve', factor: 1, positions: { foo: 'approve', bar: 'reject' } }, // foo 2, bar 0
      { status: 'reject', factor: 1, positions: { foo: 'neutral', bar: 'skip' } }, // foo 1, bar 0
      { status: 'neutral', factor: 1, positions: { foo: 'reject', bar: 'neutral' } }, // foo 1, bar 2
      { status: 'reject', factor: 1, positions: { foo: 'reject', bar: null } }, // foo 2, bar 0
      { status: 'reject', factor: 2, positions: { foo: 'reject', bar: 'approve' } }, // foo 4, bar 0
      { status: 'neutral', factor: 2, positions: { foo: 'skip', bar: 'approve' } }, // foo 0, bar 2
      { status: 'skip', factor: 1, positions: { foo: 'skip', bar: 'neutral' } }, // foo 0, bar 0
    ];
    const matches = wrapper.vm.calculate(parties, theses);
    expect(matches[0].party.alias).to.equal('foo');
    expect(matches[0].points).to.equal(10);
    expect(matches[0].percentage).to.equal(1 / 20 * 10);
    expect(matches[1].party.alias).to.equal('bar');
    expect(matches[1].points).to.equal(8);
    expect(matches[1].percentage).to.equal(1 / 20 * 8);
  });
});
