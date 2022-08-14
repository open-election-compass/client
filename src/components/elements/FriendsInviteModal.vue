<template>
  <ModalView
    :visible="visible"
    :heading="$t('elements.friends-invite-modal.heading')"
    :description="$t('elements.friends-invite-modal.description')"
    name="friends-settings"
    width="narrow"
    icon="user-plus"
    class="friends-invite-modal"
    no-padding
    :buttons="[
      {
        theme: 'neutral',
        caption: $t('elements.friends-invite-modal.cancel'),
        eventName: 'close',
      },
      {
        theme: 'positive',
        caption: $t('elements.friends-invite-modal.confirm'),
        left: 'broadcast-tower',
        eventName: 'confirm',
        disabled: !name || name.length < 1,
      },
    ]"
    @confirm="host"
    @close="$emit('close')"
  >
    <form class="friends-invite-modal__form" @submit.prevent="host" @keyup.enter="host">
      <FieldInput
        alias="name"
        name="name"
        type="text"
        :label="$t('elements.friends-invite-modal.form.name.label')"
        :description="$t('elements.friends-invite-modal.form.name.description')"
        :rules="{
          required: true,
          min: 1,
        }"
        v-model:value="name"
      />
    </form>
    <AccordionList
      :items="[
        {
          alias: 'introduction',
          caption: $t('elements.friends-invite-modal.introduction.heading'),
        },
        {
          alias: 'security',
          caption: $t('elements.friends-invite-modal.security.heading'),
        },
        {
          alias: 'registration',
          caption: $t('elements.friends-invite-modal.registration.heading'),
        },
      ]"
    >
      <template v-slot:introduction>
        <p
          v-for="(explanation, index) in $tm(
            'elements.friends-invite-modal.introduction.explanation'
          )"
          :key="index"
        >
          {{ explanation }}
        </p>
      </template>
      <template v-slot:security>
        <p
          v-for="(explanation, index) in $tm('elements.friends-invite-modal.security.explanation')"
          :key="index"
        >
          {{ explanation }}
        </p>
      </template>
      <template v-slot:registration>
        <p
          v-for="(explanation, index) in $tm(
            'elements.friends-invite-modal.registration.explanation'
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
  name: 'FriendsInviteModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    async host() {
      this.$store.commit('friends/setName', this.name);
      await this.$store.dispatch('friends/host/hostSession');
      this.$emit('close');
      this.bus.emit('how-u-doin');
    },
  },
};
</script>

<style lang="scss">
.friends-invite-modal {
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
}

@media (min-width: 40rem) {
  .friends-invite-modal__form {
    padding: 2rem;
  }
}

@media (min-width: 60rem) {
  .friends-invite-modal__form {
    padding: 2rem;
  }
}
</style>
