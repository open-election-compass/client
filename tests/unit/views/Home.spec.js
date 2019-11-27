import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import OpenElectionCompass from '@/OpenElectionCompass.vue';

describe('OpenElectionCompass.vue', () => {
  it('reads default slot and sends text content to readTranslations()', () => {
    const wrapper = shallowMount(OpenElectionCompass, {
      slots: `{
        "title": "Test-Title",
      }`,
      mocks: {
        $i18n: {
          locale: 'en',
        },
      },
    });
    expect(wrapper.text()).to.include('Test-Title');
  });
});
