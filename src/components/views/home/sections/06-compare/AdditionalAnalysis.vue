<template>
  <Modal
    class="additional-analysis"
    :heading="$t('heading')"
    :buttons="modalButtons"
    icon="chart-bar"
    width="narrow"
    :visible="active"
    @close="close"
    @proceed="proceed"
  >
    <div v-if="currentQuestion" ref="field">
      <div v-if="currentQuestion.type === 'start'" class="additional-analysis__start">
        <p>{{ $t('start') }}</p>
      </div>
      <div v-else-if="currentQuestion.type === 'end'" class="additional-analysis__end">
        <p v-if="$root.$te('analysis.survey')">{{ $t('help-even-more') }}</p>
        <p v-else>{{ $t('thanks') }}</p>
      </div>
      <component
        v-else-if="currentField"
        :is="{
          'text': 'FieldInput',
          'number': 'FieldInput',
          'switch': 'FieldSwitch',
          'select': 'FieldSelect',
        }[currentQuestion.type]"
        :key="currentQuestion.alias"
        :alias="currentQuestion.alias"
        :type="currentQuestion.type"
        :name="currentQuestion.name"
        :label="currentQuestion.label"
        :rules="currentQuestion.rules"
        :placeholder="
          $te(`fields.${currentQuestion.alias}.placeholder`)
          ? $t(`fields.${currentQuestion.alias}.placeholder`)
          : undefined
        "
        :description="
          $te(`fields.${currentQuestion.alias}.description`)
          ? $t(`fields.${currentQuestion.alias}.description`)
          : undefined
        "
        :options="currentQuestion.options"
        v-model="currentFieldValue"
      />
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'AdditionalAnalysis',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentQuestionAlias: null,
    };
  },
  computed: {
    analysis() {
      return this.$store.getters['analysis/analysis'];
    },
    currentField() {
      return this.analysis.find((field) => field.name === this.currentQuestionAlias);
    },
    currentFieldValue: {
      get() {
        return this.currentField.value;
      },
      set(value) {
        this.$store.commit('analysis/setField', { name: this.currentField.name, value });
      },
    },
    currentQuestion() {
      return this.questions.find((question) => question.alias === this.currentQuestionAlias);
    },
    nextQuestion() {
      const currentIndex = this.questions.findIndex(
        (question) => question.alias === this.currentQuestionAlias,
      );
      return this.questions[currentIndex + 1];
    },
    parties() {
      return this.$store.getters['parties/parties'];
    },
    questions() {
      return [
        {
          alias: 'start',
          type: 'start',
        },
        {
          alias: 'age',
          type: 'number',
          name: this.$t('fields.age.name'),
          label: this.$t('fields.age.label'),
          rules: 'required|integer',
        },
        {
          alias: 'gender',
          type: 'switch',
          name: this.$t('fields.gender.name'),
          label: this.$t('fields.gender.label'),
          options: [
            {
              value: 'female',
              option: this.$t('fields.gender.options.female'),
            },
            {
              value: 'diverse',
              option: this.$t('fields.gender.options.diverse'),
            },
            {
              value: 'male',
              option: this.$t('fields.gender.options.male'),
            },
            {
              value: 'none',
              option: this.$t('fields.gender.options.none'),
            },
          ],
          rules: 'required',
        },
        {
          alias: 'education',
          type: 'switch',
          name: this.$t('fields.education.name'),
          label: this.$t('fields.education.label'),
          options: [
            {
              value: 'student',
              option: this.$t('fields.education.options.student'),
            },
            {
              value: 'nothing',
              option: this.$t('fields.education.options.nothing'),
            },
            {
              value: 'lower',
              option: this.$t('fields.education.options.lower'),
            },
            {
              value: 'higher',
              option: this.$t('fields.education.options.higher'),
            },
            {
              value: 'academic',
              option: this.$t('fields.education.options.academic'),
            },
            {
              value: 'none',
              option: this.$t('fields.education.options.none'),
            },
          ],
          rules: 'required',
        },
        {
          alias: 'party',
          type: 'select',
          name: this.$t('fields.party.name'),
          label: this.$t('fields.party.label'),
          options: (() => {
            const options = this.parties.map((party) => ({
              value: party.alias,
              option: this.$t(`parties.${party.index}.short`),
            }));
            options.push({
              value: '###OTHER###',
              option: this.$t('fields.party.options.other'),
            });
            options.push({
              value: '###NON_VOTER###',
              option: this.$t('fields.party.options.non-voter'),
            });
            options.push({
              value: '###NOT_ELIGIBLE###',
              option: this.$t('fields.party.options.not-eligible'),
            });
            options.push({
              value: '###NOT_SURE###',
              option: this.$t('fields.party.options.not-sure'),
            });
            options.push({
              value: '###NONE###',
              option: this.$t('fields.party.options.none'),
            });
            return options;
          })(),
          rules: 'required',
        },
        {
          alias: 'end',
          type: 'end',
        },
      ];
    },
    nextButtonDisabled() {
      // When mounting
      if (this.currentQuestion === undefined) {
        return true;
      }

      // Enable next button for first and last question
      if (['start', 'end'].includes(this.currentQuestion.type)) {
        return false;
      }

      // Disable next button when there is no field visible
      if (this.currentField === undefined) {
        return true;
      }

      // Disable next button when current value is null
      return this.currentField.value === null;
    },
    modalButtons() {
      // Close Button
      const buttons = [
        {
          caption: this.$t('buttons.close'),
          theme: 'neutral',
          eventName: 'close',
          disabled: this.currentQuestionAlias === 'start',
        },
      ];

      // Survey Button
      if (this.currentQuestionAlias === 'end' && this.$root.$te('analysis.survey')) {
        buttons.push({
          tag: 'a',
          caption: this.$t('buttons.open-questionnaire'),
          theme: 'primary',
          href: this.$t('analysis.survey'),
          target: '_blank',
          right: 'external-link-alt',
        });
      }

      // Start / Next Button
      if (this.currentQuestionAlias !== 'end') {
        buttons.push({
          caption: this.currentQuestionAlias === 'start'
            ? this.$t('buttons.start')
            : this.$t('buttons.proceed'),
          theme: 'positive',
          eventName: 'proceed',
        });
      }
      return buttons;
    },
  },
  methods: {
    close() {
      this.$store.dispatch('analysis/optOut');
    },
    proceed() {
      if (this.nextButtonDisabled) {
        return;
      }
      this.$store.dispatch('analysis/send');
      if (this.$refs.field.animate === undefined) {
        this.currentQuestionAlias = this.nextQuestion.alias || undefined;
        return;
      }
      this.$refs.field.animate(
        [
          { opacity: 1 },
          { opacity: 0 },
        ],
        {
          duration: 100,
        },
      ).onfinish = () => {
        this.currentQuestionAlias = this.nextQuestion.alias || undefined;
        this.$refs.field.animate(
          [
            { opacity: 0 },
            { opacity: 1 },
          ],
          {
            duration: 400,
          },
        );
      };
    },
  },
  mounted() {
    this.currentQuestionAlias = this.nextQuestion.alias;
  },
};
</script>

<style lang="scss">
@media (min-width: 40em) {
  .additional-analysis__start,
  .additional-analysis__end {
    p {
      font-size: 1.25em;
    }
  }
}
</style>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Statistics",
    "buttons": {
      "close": "Quit",
      "start": "Let's go",
      "proceed": "Submit and next",
      "open-questionnaire": "Open survey in new tab"
    },
    "start": "Thank you for sharing! Your data becomes more valuable for statistics if you share some more background information about yourself – would you help some more? Simply answer as many questions as you like!",
    "help-even-more": "Thank you very much! Would you like to help even more? You can answer some more specific questions here:",
    "thanks": "Thank you for sharing! Those were all the questions – you helped us a lot! Click on 'Quit' to go back to your results.",
    "fields": {
      "age": {
        "name": "Age",
        "label": "How old are you now?",
        "placeholder": "25",
        "description": "Your age is important to research what people of different age groups think about the theses and parties."
      },
      "gender": {
        "name": "Gender",
        "label": "What is your gender?",
        "options": {
          "female": "female",
          "diverse": "diverse",
          "male": "male",
          "none": "no answer"
        }
      },
      "education": {
        "name": "Qualification",
        "label": "What is your highest educational qualification?",
        "options": {
          "student": "Currently a student",
          "nothing": "No complete qualification",
          "lower": "Middle School or similar",
          "higher": "High School or similar",
          "academic": "Academic",
          "none": "no answer"
        }
      },
      "party": {
        "name": "Party",
        "label": "If the election was today, who would you cast your vote for?",
        "options": {
          "other": "Other",
          "non-voter": "I won't vote",
          "not-eligible": "I am not eligible",
          "not-sure": "I'm not sure",
          "none": "no answer"
        }
      }
    }
  },
  "de": {
    "heading": "Statistik",
    "buttons": {
      "close": "Beenden",
      "start": "Los geht's",
      "proceed": "Senden und weiter",
      "open-questionnaire": "Umfrage in neuem Tab öffnen"
    },
    "start": "Vielen Dank für's Teilen! Dein Datensatz wird wertvoller, wenn du noch einige Fragen zu deiner Person beantwortest – würdest du noch etwas mehr mithelfen? Beantworte einfach so viele Fragen, wie du möchtest!",
    "help-even-more": "Vielen Dank! Möchtest du noch mehr tun? Dann kannst du noch ein paar genauere Fragen beantworten:",
    "thanks": "Vielen Dank! Das waren alle Fragen – du hast uns sehr geholfen. Klicke auf 'Beenden' um zu deinem Ergebnis zurückzukehren.",
    "fields": {
      "age": {
        "name": "Alter",
        "label": "Wie alt bist du?",
        "placeholder": "25",
        "description": "Dein Alter ist wichtig um zu ermitteln wie die jeweiligen Altersgruppen zu den Thesen und Parteien stehen."
      },
      "gender": {
        "name": "Geschlecht",
        "label": "Welches Geschlecht hast du?",
        "options": {
          "female": "weiblich",
          "diverse": "divers",
          "male": "männlich",
          "none": "keine Angabe"
        }
      },
      "education": {
        "name": "Bildungsabschluss",
        "label": "Was ist dein höchster Bildungsabschluss?",
        "options": {
          "student": "Noch Schüler:in",
          "nothing": "Schule beendet ohne Abschluss",
          "lower": "Haupt- oder Realschulabschluss",
          "higher": "Abitur oder Fachoberschulreife",
          "academic": "Abgeschlossenes Studium",
          "none": "keine Angabe"
        }
      },
      "party": {
        "name": "Partei",
        "label": "Wenn heute der gewählt würde, wer bekäme deine Stimme?",
        "options": {
          "other": "Sonstige",
          "non-voter": "Ich nehme nicht teil",
          "not-eligible": "Ich bin nicht stimmberechtigt",
          "not-sure": "Ich bin nicht sicher",
          "none": "keine Angabe"
        }
      }
    }
  }
}
</i18n>
<!-- eslint-enable max-len -->
