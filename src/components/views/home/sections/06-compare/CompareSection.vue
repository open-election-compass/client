<template>
  <div>
    <page-section class="bg-white" data-section="compare">
      <h2 class="text-primary">{{ $t('heading') }}</h2>
      <p>
        {{ $t('explanation') }}
      </p>
      <aside
        v-if="$store.getters['options/kioskMode']"
        class="
          bg-gray-200 rounded p-4 mt-8 text-center
          md:p-6 md:text-lg
          lg:p-8
        "
      >
        <div class="
          text-lg text-center
          md:text-xl
          lg:text-3xl
        ">
          <Icon name="undo" class="gray-500" />
        </div>
        <strong class="block my-4 md:text-xl lg:text-2xl">
          {{ $t('kiosk.heading') }}
        </strong>
        <p>{{ $t('kiosk.explanation') }}</p>
        <BaseButton
          class="mt-4 md:mt-6"
          theme="negative"
          left="undo"
          size="small"
          @click="$root.$emit('reset', { seconds: 15 })"
        >
          {{ $t('kiosk.reset') }}
        </BaseButton>
      </aside>
    </page-section>
    <page-section
      v-for="(thesis) in theses"
      :key="thesis.index"
      class="border-t-2 border-gray-300"
      role="region"
      :data-section="`compare-thesis-${thesis.index}`"
      :aria-label="$t('region-aria', { count: thesis.index + 1, total })"
      :id="`compare-thesis-${thesis.index}`"
    >
      <statement
        :index="thesis.index"
        :status="getStatus(thesis.index)"
        :factor="thesis.factor"
        :badge="true"
      />
      <template
        v-for="result in results"
      >
        <answer
          :key="`${thesis.index}-${result.party.index}`"
          :party="result.party"
          :thesis="thesis"
        />
      </template>
    </page-section>
  </div>
</template>

<script>
import Answer from './Answer.vue';
import BaseButton from '../../../../elements/BaseButton.vue';
import Icon from '../../../../elements/Icon.vue';
import Statement from '../03-theses/Statement.vue';

export default {
  name: 'CompareSection',
  computed: {
    theses() {
      return this.$store.getters['theses/theses'];
    },
    total() {
      return this.$store.getters['theses/total'];
    },
    results() {
      return this.$store.getters['parties/results'];
    },
  },
  methods: {
    getStatus(index) {
      return this.$store.getters['theses/theses'][index].status;
    },
  },
  components: {
    Answer,
    BaseButton,
    Icon,
    Statement,
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Their answers",
    "explanation": "The parties typically provide statements for every thesis to explain their reasoning. It is not always obvious why a party asumes a certain position so it is recommended to read this statements or the respective election manifestos.",
    "region-aria": "Thesis {count} of {total}",
    "kiosk": {
      "heading": "Please reset when you're done",
      "explanation": "Take your time reading and comparing the answers statements below. When you're done, you can reset the election compass here for the next person. This will also delete your own answers. Hint: you can also find a reset button in the menu. Thank you!",
      "reset": "Reset"
    }
  },
  "de": {
    "heading": "Die Antworten",
    "explanation": "Die Parteien stellen üblicherweise eine Erklärung zu jeder Entscheidung bereit. Da es nicht immer offensichtlich ist, warum eine Partei eine bestimmte Position vertritt, empfiehlt es sich, diese Erklärungen oder die jeweiligen Wahlprogramme zu lesen.",
    "region-aria": "These {count} von {total}",
    "kiosk": {
      "heading": "Bitte setz mich zurück, wenn du fertig bist",
      "explanation": "Lies und vergleiche die Erklärungen unterhalb in Ruhe. Wenn du fertig bist, kannst du den Wahlkompass hier für die nächste Person zurücksetzen. Dadurch werden auch deine eigenen Antworten gelöscht. Tipp: Du findest diese Option auch im Menü. Vielen Dank!",
      "reset": "Zurücksetzen"
    }
  }
}
</i18n>
<!-- eslint-enable max-len -->
