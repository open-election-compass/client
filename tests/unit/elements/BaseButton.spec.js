import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/elements/BaseButton.vue';
import Icon from '@/components/elements/Icon.vue';

describe('BaseButton.vue', () => {
  let wrapper;
  const options = {};

  beforeEach(() => {
    wrapper = shallowMount(BaseButton, options);
  });

  it('renders a `button` or an `a` tag', async () => {
    await wrapper.setProps({ tag: 'button' });
    expect(wrapper.element.tagName).toBe('BUTTON');
    await wrapper.setProps({ tag: 'a' });
    expect(wrapper.element.tagName).toBe('A');
  });

  it('can be disabled', async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.element.disabled).toBe(true);
    expect(wrapper.element.tabIndex).toBe(-1);
    expect(wrapper.classes('base-button--disabled')).toBe(true);
  });

  it('uses tabindex', async () => {
    await wrapper.setProps({ tabindex: 3 });
    expect(wrapper.attributes('tabindex')).toBe('3');
  });

  it('can render an icon before the caption', async () => {
    await wrapper.setProps({ left: 'check' });
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it('can render an icon after the caption', async () => {
    await wrapper.setProps({ left: 'check' });
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it('uses the default slot as the caption', () => {
    wrapper = shallowMount(BaseButton, Object.assign(options, {
      slots: {
        default: 'Foo',
      },
    }));
    expect(wrapper.text()).toBe('Foo');
  });

  it('sets the href attribute when used as a link', async () => {
    const href = 'https://example.com';
    await wrapper.setProps({
      href,
    });
    expect(wrapper.attributes().href).toBeUndefined();
    await wrapper.setProps({
      tag: 'a',
    });
    expect(wrapper.attributes().href).toBe(href);
  });

  it('sets the button type', async () => {
    await wrapper.setProps({
      tag: 'a',
      type: 'submit',
    });
    expect(wrapper.attributes().type).toBeUndefined();
    await wrapper.setProps({
      tag: 'button',
      type: 'button',
    });
    expect(wrapper.attributes('type')).toBe('button');
    await wrapper.setProps({
      type: 'submit',
    });
    expect(wrapper.attributes('type')).toBe('submit');
    await wrapper.setProps({
      type: 'reset',
    });
    expect(wrapper.attributes('type')).toBe('reset');
  });

  it('can use different themes', async () => {
    await wrapper.setProps({
      theme: 'primary',
    });
    expect(wrapper.classes('base-button--theme-primary')).toBe(true);
    expect(wrapper.classes('base-button--theme-positive')).toBe(false);
    await wrapper.setProps({
      theme: 'positive',
    });
    expect(wrapper.classes('base-button--theme-primary')).toBe(false);
    expect(wrapper.classes('base-button--theme-positive')).toBe(true);
  });

  it('supports different sizes', async () => {
    await wrapper.setProps({
      size: 'small',
    });
    expect(wrapper.classes('base-button--size-small')).toBe(true);
    expect(wrapper.classes('base-button--size-big')).toBe(false);
    await wrapper.setProps({
      size: 'big',
    });
    expect(wrapper.classes('base-button--size-small')).toBe(false);
    expect(wrapper.classes('base-button--size-big')).toBe(true);
  });

  it('supports different text alignments', async () => {
    await wrapper.setProps({
      textAlign: 'left',
    });
    expect(wrapper.classes('base-button--text-align-left')).toBe(true);
    expect(wrapper.classes('base-button--text-align-center')).toBe(false);
    await wrapper.setProps({
      textAlign: 'center',
    });
    expect(wrapper.classes('base-button--text-align-left')).toBe(false);
    expect(wrapper.classes('base-button--text-align-center')).toBe(true);
  });

  it('handles the click event correctly', async () => {
    await wrapper.setProps({
      tag: 'a',
      href: 'https://example.com',
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    await wrapper.setProps({
      disabled: true,
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    await wrapper.setProps({
      tag: 'button',
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    await wrapper.setProps({
      disabled: false,
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(2);
  });
});
