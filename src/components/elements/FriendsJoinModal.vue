<template>
  <ModalView
    :visible="visible"
    :heading="$t('elements.friends-join-modal.heading')"
    :description="$t('elements.friends-join-modal.description')"
    name="friends-settings"
    width="narrow"
    icon="user-friends"
    class="friends-join-modal"
    no-padding
    :buttons="[
      {
        theme: 'neutral',
        caption: $t('elements.friends-join-modal.cancel'),
        eventName: 'close',
      },
      {
        theme: 'positive',
        caption: $t('elements.friends-join-modal.confirm'),
        left: 'project-diagram',
        eventName: 'confirm',
        disabled: !name || name.length < 1 || !remotePeerId || remotePeerId.length < 1,
      },
    ]"
    @confirm="join"
    @close="$emit('close')"
  >
    <form class="friends-join-modal__form" @submit.prevent="join" @keyup.enter="join">
      <FieldInput
        alias="name"
        name="name"
        type="text"
        :label="$t('elements.friends-join-modal.form.name.label')"
        :description="$t('elements.friends-join-modal.form.name.description')"
        :rules="{
          required: true,
          min: 1,
          regex: new RegExp(/^[\p{Letter}\p{Mark}\d\s]*$/, 'u'),
        }"
        v-model:value="name"
      />
      <FieldInput
        alias="remote-peer-id"
        name="remote-peer-id"
        type="text"
        :label="$t('elements.friends-join-modal.form.join.label')"
        :description="$t('elements.friends-join-modal.form.join.description')"
        rules="required|length:8"
        v-model:value="remotePeerId"
      />
    </form>
    <AccordionList
      :items="[
        {
          alias: 'introduction',
          caption: $t('elements.friends-join-modal.introduction.heading'),
        },
        {
          alias: 'security',
          caption: $t('elements.friends-join-modal.security.heading'),
        },
        {
          alias: 'registration',
          caption: $t('elements.friends-join-modal.registration.heading'),
        },
      ]"
    >
      <template v-slot:introduction>
        <p
          v-for="(explanation, index) in $tm(
            'elements.friends-join-modal.introduction.explanation'
          )"
          :key="index"
        >
          {{ explanation }}
        </p>
      </template>
      <template v-slot:security>
        <p
          v-for="(explanation, index) in $tm('elements.friends-join-modal.security.explanation')"
          :key="index"
        >
          {{ explanation }}
        </p>
      </template>
      <template v-slot:registration>
        <p
          v-for="(explanation, index) in $tm(
            'elements.friends-join-modal.registration.explanation'
          )"
          :key="index"
        >
          {{ explanation }}
        </p>
      </template>
    </AccordionList>
  </ModalView>
</template>

<script lang="js">
export default {
  name: 'FriendsJoinModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      remotePeerId: null,
    };
  },
  methods: {
    async join() {
      this.$store.commit('friends/setName', this.name);
      await this.$store.dispatch('friends/guest/joinSession', { remoteId: this.remotePeerId.toUpperCase() });
      this.$emit('close');
      this.bus.emit('how-u-doin');
    },
  },
};
</script>

<style lang="scss">
.friends-join-modal {
  &__form {
    padding: 1rem;
  }
  p {
    margin-bottom: 1em;
    max-width: 30rem;
  }
  .field-input + .field-input {
    margin-top: 1rem;
  }
  #field-remote-peer-id {
    text-align: center;
    font-family: monospace;
    letter-spacing: 0.25em;
  }
}

@media (min-width: 40rem) {
  .friends-join-modal__form {
    padding: 2rem;
  }
}

@media (min-width: 60rem) {
  .friends-join-modal__form {
    padding: 2rem;
  }
}
</style>
