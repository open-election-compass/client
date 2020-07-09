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

  it('counts theses marked as important', () => {
    state.theses = [
      { status: 'approve', factor: 1 },
      { status: 'reject', factor: 2 }, // important
      { status: 'neutral', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'approve', factor: 1 },
      { status: 'skip', factor: 1 },
      { status: 'reject', factor: 2 }, // important
    ];
    expect(VuexThesesModule.getters.countImportant(state)).toBe(2);
  });

  it('calculates the maximum of theses that can be marked as important (max 50%)', () => {
    state.theses = [
      { status: 'approve', factor: 1 },
      { status: 'reject', factor: 2 },
      { status: 'neutral', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'approve', factor: 1 },
      { status: 'skip', factor: 1 },
      { status: 'reject', factor: 2 },
    ];
    expect(VuexThesesModule.getters.maxImportant(state)).toBe(3);
  });

  it('counts skipped theses', () => {
    state.theses = [
      { status: 'skip', factor: 1 }, // skipped
      { status: 'reject', factor: 2 },
      { status: 'neutral', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'approve', factor: 1 },
      { status: 'skip', factor: 1 }, // skipped
      { status: 'reject', factor: 2 },
    ];
    expect(VuexThesesModule.getters.countSkip(state)).toBe(2);
  });

  it('calculates the maximum of theses that can be skipped (max 25%)', () => {
    state.theses = [
      { status: 'approve', factor: 1 },
      { status: 'reject', factor: 2 },
      { status: 'neutral', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'approve', factor: 1 },
      { status: 'skip', factor: 1 },
      { status: 'reject', factor: 1 },
      { status: 'approve', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'neutral', factor: 1 },
      { status: 'reject', factor: 1 },
    ];
    expect(VuexThesesModule.getters.maxSkip(state)).toBe(2);
  });
});
