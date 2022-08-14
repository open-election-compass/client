import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import GuideButton from '@/components/elements/GuideButton.vue';

const BaseButton = {
  template: '<button><slot /></button>',
};

describe('GuideButton.vue', () => {
  let wrapper;
  const section1 = { alias: 'section-1', completed: true, message: '' };
  const section2 = { alias: 'section-2', completed: false, message: '' };
  const section3 = { alias: 'section-3', completed: false, message: '' };
  const te = vi.fn().mockImplementation(() => true);

  beforeEach(() => {
    const store = createStore({
      modules: {
        languages: {
          namespaced: true,
          state: {
            active: {
              directive: 'ltr',
            },
          },
          getters: {
            active: (state) => state.active,
          },
        },
        sections: {
          namespaced: true,
          state: {
            sections: [section1, section2, section3],
            activeSection: section1.alias, // the section the user should be in
            actualSection: section1.alias, // the section the user is actually in (scroll position)
          },
          getters: {
            sections: (state) => state.sections,
            activeSection(state) {
              return state.sections.find((section) => section.alias === state.activeSection);
            },
            actualSection(state) {
              return state.sections.find((section) => section.alias === state.actualSection);
            },
            guideButtonEnabled: () => true,
          },
          mutations: {
            setActiveSection: (state, section) => {
              state.activeSection = section.alias;
            },
            setActualSection: (state, section) => {
              state.actualSection = section.alias;
            },
          },
        },
      },
    });
    const options = {
      global: {
        mocks: {
          $t: (msg) => msg,
          $te: te,
          $i18n: {
            fallbackLocale: 'en',
          },
        },
        stubs: {
          BaseButton,
        },
        plugins: [store],
      },
      props: {
        initialDelay: 0, // easier to test without timeouts
        throttle: 0, // vi.useFakeTimers() would not affect lodash's throttle()
      },
    };
    wrapper = shallowMount(GuideButton, options);
  });

  it('uses `BaseButton` to render a button', async () => {
    await wrapper.vm.$store.commit('sections/setActiveSection', section2);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('calculates the index of the next section', async () => {
    await wrapper.vm.$store.commit('sections/setActiveSection', section1);
    expect(wrapper.vm.nextSection).toStrictEqual(section2);
    await wrapper.vm.$store.commit('sections/setActiveSection', section2);
    expect(wrapper.vm.nextSection).toStrictEqual(section3);
  });

  it('shows when active section is not the actually visible section', async () => {
    await wrapper.vm.$store.commit('sections/setActiveSection', section2);
    await wrapper.vm.$store.commit('sections/setActualSection', section2);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(false);
    await wrapper.vm.$store.commit('sections/setActiveSection', section1);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('only shows when the button caption is at least available through a fallback translation', async () => {
    await wrapper.vm.$store.commit('sections/setActualSection', section2);
    await wrapper.vm.$store.commit('sections/setActiveSection', section2);
    te.mockImplementationOnce(() => false);
    await wrapper.vm.$store.commit('sections/setActualSection', section1);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(false);
    await wrapper.vm.$store.commit('sections/setActualSection', section2);

    te.mockImplementationOnce((path, locale) => locale === 'en');
    await wrapper.vm.$store.commit('sections/setActualSection', section1);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('hides when active section is the actually visible section', async () => {
    await wrapper.vm.$store.commit('sections/setActiveSection', section2);
    await wrapper.vm.$store.commit('sections/setActualSection', section1);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
    await wrapper.vm.$store.commit('sections/setActualSection', section2);
    expect(wrapper.findComponent(BaseButton).exists()).toBe(false);
  });
});
