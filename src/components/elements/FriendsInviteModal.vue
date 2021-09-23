<template>
  <ValidationObserver v-slot="{ valid }">
    <Modal
      :visible="visible"
      :heading="$t('heading')"
      :description="$t('description')"
      name="friends-settings"
      width="narrow"
      icon="user-plus"
      class="friends-invite-modal"
      no-padding
      :buttons="[
        {
          theme: 'neutral',
          caption: $t('cancel'),
          eventName: 'close'
        },
        {
          theme: 'positive',
          caption: $t('confirm'),
          left: 'broadcast-tower',
          eventName: 'confirm',
          disabled: !valid,
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
          :label="$t('form.name.label')"
          :description="$t('form.name.description')"
          :rules="{
            required: true,
            min: 1,
            regex: new RegExp(/^[\p{Letter}\p{Mark}\d\s]*$/, 'u')
          }"
          v-model="name"
        />
      </form>
      <AccordionList
        :items="[
          { alias: 'introduction', caption: $t('introduction.heading') },
          { alias: 'security', caption: $t('security.heading') },
          { alias: 'registration', caption: $t('registration.heading') },
        ]"
      >
        <template v-slot:introduction>
          <p v-for="(explanation, index) in $t('introduction.explanation')" :key="index">
            {{ explanation }}
          </p>
        </template>
        <template v-slot:security>
          <p v-for="(explanation, index) in $t('security.explanation')" :key="index">
            {{ explanation }}
          </p>
        </template>
        <template v-slot:registration>
          <p v-for="(explanation, index) in $t('registration.explanation')" :key="index">
            {{ explanation }}
          </p>
        </template>
      </AccordionList>
    </Modal>
  </ValidationObserver>
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
      name: null,
    };
  },
  methods: {
    async host() {
      this.$store.commit('friends/setName', this.name);
      await this.$store.dispatch('friends/host/hostSession');
      this.$emit('close');
      this.$root.$emit('how-u-doin');
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/core.scss";

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

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Invite friends",
    "description": "Invite your friends to a shared session where everyone can see each other's answers in real time.",
    "form": {
      "name": {
        "label": "Your name / nickname",
        "description": "Please provide your name so your friends can recognize you. You can also use a nickname."
      }
    },
    "introduction": {
      "heading": "What is a shared session?",
      "explanation": [
        "A shared session allows you to experience the election compass with your friends. One person invites the others to a shared session. Once everyone joined, you can each use the election compass as you normally would. But in addition to the parties, you can now also see each other's answers and start a discussion."
      ]
    },
    "security": {
      "heading": "Are my answers safe?",
      "explanation": [
        "Yes! Your answers are exchanged directly between your devices via a secure connection. A server helps the devices find themselves on the Internet - your answers, however, are not sent via the server, but directly from device to device."
      ]
    },
    "registration": {
      "heading": "Do I need to register to use this feature?",
      "explanation": [
        "No registration is necessary. All you have to do is enter your name and you can join a session."
      ]
    },
    "cancel": "Cancel",
    "confirm": "Open session"
  },
  "de": {
    "heading": "Freund:innen einladen",
    "description": "Lade deine Freund:innen zu einer gemeinsame Sitzung ein, sodass alle die Antworten der anderen in Echtzeit sehen können.",
    "form": {
      "name": {
        "label": "Dein Name",
        "description": "Damit ihr euch in einer gemeinsamen Sitzung auch wiedererkennt, benötigen wir einen Namen oder Spitznamen."
      }
    },
    "introduction": {
      "heading": "Was ist eine gemeinsame Sitzung?",
      "explanation": [
        "Eine gemeinsame Sitzung ermöglicht es dir, den Wahlkompass gemeinsam mit deinen Freund:innen zu erleben. Eine Person lädt die anderen zu einer gemeinsamen Sitzung ein. Sobald alle beigetreten sind, gehen alle den Wahlkompass durch, wie sie es normalerweise tun würden. Zusätzlich zu den Parteien, sehr ihr nun auch die Antworten der anderen und könnt eine Diskussion beginnen."
      ]
    },
    "security": {
      "heading": "Sind meine Antworten sicher?",
      "explanation": [
        "Ja! Eure Antworten werden über eine sichere Verbindung direkt zwischen euren Geräten ausgetauscht. Ein Server hilft den Geräten dabei, sich im Internet zu finden – eure Antworten werden jedoch nicht über den Server geschickt, sondern direkt von Gerät zu Gerät."
      ]
    },
    "registration": {
      "heading": "Muss ich mich registrieren um diese Funktion nutzen zu können?",
      "explanation": [
        "Es ist keine Registrierung nötig. Du musst nur deinen Namen eingeben und schon kannst du einer Sitzung beitreten."
      ]
    },
    "cancel": "Abbrechen",
    "confirm": "Sitzung starten"
  }
}
</i18n>
<!-- eslint-enable max-len -->
