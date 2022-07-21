<template>
  <ModalView
    class="additional-analysis"
    :heading="$t('views.home.compare.additional-analysis.heading')"
    :buttons="modalButtons"
    icon="chart-bar"
    width="narrow"
    :visible="active"
    @close="close"
    @proceed="proceed"
  >
    <div v-if="currentQuestion" ref="field">
      <div v-if="currentQuestion.type === 'start'" class="additional-analysis__start">
        <p>{{ $t('views.home.compare.additional-analysis.start') }}</p>
      </div>
      <div v-else-if="currentQuestion.type === 'end'" class="additional-analysis__end">
        <p v-if="$root.$te('analysis.survey')">
          {{ $t('views.home.compare.additional-analysis.help-even-more') }}
        </p>
        <p v-else>{{ $t('views.home.compare.additional-analysis.thanks') }}</p>
      </div>
      <component
        v-else-if="currentField"
        :is="
          {
            text: 'FieldInput',
            number: 'FieldInput',
            switch: 'FieldSwitch',
            select: 'FieldSelect',
          }[currentQuestion.type]
        "
        :key="currentQuestion.alias"
        :alias="currentQuestion.alias"
        :type="currentQuestion.type"
        :name="currentQuestion.name"
        :label="currentQuestion.label"
        :rules="currentQuestion.rules"
        :placeholder="
          $te(`views.home.compare.additional-analysis.fields.${currentQuestion.alias}.placeholder`)
            ? $t(
                `views.home.compare.additional-analysis.fields.${currentQuestion.alias}.placeholder`
              )
            : undefined
        "
        :description="
          $te(`views.home.compare.additional-analysis.fields.${currentQuestion.alias}.description`)
            ? $t(
                `views.home.compare.additional-analysis.fields.${currentQuestion.alias}.description`
              )
            : undefined
        "
        :options="currentQuestion.options"
        v-model:value="currentFieldValue"
      />
    </div>
  </ModalView>
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
        (question) => question.alias === this.currentQuestionAlias
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
          name: this.$t('views.home.compare.additional-analysis.fields.age.name'),
          label: this.$t('views.home.compare.additional-analysis.fields.age.label'),
          rules: 'required|integer',
        },
        {
          alias: 'gender',
          type: 'switch',
          name: this.$t('views.home.compare.additional-analysis.fields.gender.name'),
          label: this.$t('views.home.compare.additional-analysis.fields.gender.label'),
          options: [
            {
              value: 'female',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.gender.options.female'
              ),
            },
            {
              value: 'diverse',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.gender.options.diverse'
              ),
            },
            {
              value: 'male',
              option: this.$t('views.home.compare.additional-analysis.fields.gender.options.male'),
            },
            {
              value: 'none',
              option: this.$t('views.home.compare.additional-analysis.fields.gender.options.none'),
            },
          ],
          rules: 'required',
        },
        {
          alias: 'education',
          type: 'switch',
          name: this.$t('views.home.compare.additional-analysis.fields.education.name'),
          label: this.$t('views.home.compare.additional-analysis.fields.education.label'),
          options: [
            {
              value: 'student',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.student'
              ),
            },
            {
              value: 'nothing',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.nothing'
              ),
            },
            {
              value: 'lower',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.lower'
              ),
            },
            {
              value: 'higher',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.higher'
              ),
            },
            {
              value: 'academic',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.academic'
              ),
            },
            {
              value: 'none',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.education.options.none'
              ),
            },
          ],
          rules: 'required',
        },
        {
          alias: 'party',
          type: 'select',
          name: this.$t('views.home.compare.additional-analysis.fields.party.name'),
          label: this.$t('views.home.compare.additional-analysis.fields.party.label'),
          options: (() => {
            const options = this.parties.map((party) => ({
              value: party.alias,
              option: this.$t(`parties.${party.index}.short`),
            }));
            options.push({
              value: '###OTHER###',
              option: this.$t('views.home.compare.additional-analysis.fields.party.options.other'),
            });
            options.push({
              value: '###NON_VOTER###',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.party.options.non-voter'
              ),
            });
            options.push({
              value: '###NOT_ELIGIBLE###',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.party.options.not-eligible'
              ),
            });
            options.push({
              value: '###NOT_SURE###',
              option: this.$t(
                'views.home.compare.additional-analysis.fields.party.options.not-sure'
              ),
            });
            options.push({
              value: '###NONE###',
              option: this.$t('views.home.compare.additional-analysis.fields.party.options.none'),
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
          caption: this.$t('views.home.compare.additional-analysis.buttons.close'),
          theme: 'neutral',
          eventName: 'close',
          disabled: this.currentQuestionAlias === 'start',
        },
      ];

      // Survey Button
      if (this.currentQuestionAlias === 'end' && this.$root.$te('analysis.survey')) {
        buttons.push({
          tag: 'a',
          caption: this.$t('views.home.compare.additional-analysis.buttons.open-questionnaire'),
          theme: 'primary',
          href: this.$t('analysis.survey'),
          target: '_blank',
          right: 'external-link-alt',
        });
      }

      // Start / Next Button
      if (this.currentQuestionAlias !== 'end') {
        buttons.push({
          caption:
            this.currentQuestionAlias === 'start'
              ? this.$t('views.home.compare.additional-analysis.buttons.start')
              : this.$t('views.home.compare.additional-analysis.buttons.proceed'),
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
      this.$refs.field.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 100,
      }).onfinish = () => {
        this.currentQuestionAlias = this.nextQuestion.alias || undefined;
        this.$refs.field.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
        });
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
