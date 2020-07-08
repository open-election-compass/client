import VuexThesesModule from '@/store/modules/theses/theses';

const state = {
  theses: [],
};

describe('Theses Store', () => {
  it('calculates the maximum points', () => {
    // Theses with no status
    state.theses = [
      { status: null, factor: 1 }, // 0
      { status: null, factor: 1 }, // 0
      { status: null, factor: 2 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(0);

    // Theses with status `skip`
    state.theses = [
      { status: 'skip', factor: 1 }, // 0
      { status: 'skip', factor: 2 }, // 0
      { status: null, factor: 2 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(0);

    // Theses with status `approve`
    state.theses = [
      { status: 'approve', factor: 1 }, // 2
      { status: 'approve', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(4);

    // Theses with status `approve` and an important flag
    state.theses = [
      { status: 'approve', factor: 1 }, // 2
      { status: 'approve', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(6);

    // Theses with status `neutral`
    state.theses = [
      { status: 'neutral', factor: 1 }, // 2
      { status: 'neutral', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(4);

    // Theses with status `neutral` and an important flag
    state.theses = [
      { status: 'neutral', factor: 1 }, // 2
      { status: 'neutral', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(6);

    // Theses with status `reject`
    state.theses = [
      { status: 'reject', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(4);

    // Theses with status `reject` and an important flag
    state.theses = [
      { status: 'reject', factor: 1 }, // 2
      { status: 'reject', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(6);

    // Theses with various statuses
    state.theses = [
      { status: 'approve', factor: 2 }, // 4
      { status: 'approve', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'neutral', factor: 1 }, // 2
      { status: 'reject', factor: 1 }, // 2
      { status: 'neutral', factor: 2 }, // 4
      { status: 'skip', factor: 1 }, // 0
    ];
    expect(VuexThesesModule.getters.maxPoints(state)).toBe(16);
  });
});
