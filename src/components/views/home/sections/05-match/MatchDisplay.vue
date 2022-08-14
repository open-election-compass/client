<template>
  <div class="match-display" role="figure">
    <div
      class="match-display__bar"
      role="img"
      :aria-label="
        $t('views.home.match.match-display.match-aria', {
          party: $t(`parties.${party.index}.name`),
          percentage: Math.round(percentage * 100),
        })
      "
    >
      <div class="match-display__progress" :style="`width:${percentage * 100}%`" />
      <span class="match-display__party-name">
        {{ $t(`parties.${party.index}.short`) }}
      </span>
      <span class="match-display__percentage">
        <bdi>
          {{ $n(percentage, { style: 'percent' }) }}
        </bdi>
      </span>
    </div>
    <p class="match-display__party-description">
      <ShowMore :length="500" :text="$t(`parties.${party.index}.description`)" />
    </p>
  </div>
</template>

<script>
import ShowMore from '/src/components/elements/ShowMore.vue';

export default {
  name: 'MatchDisplay',
  components: {
    ShowMore,
  },
  props: {
    party: {
      type: Object,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.match-display {
  margin-bottom: 1em;
}

.match-display__bar {
  background-color: var(--theme-primary-dark-background); //bg-yellow-600
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  margin-bottom: 1em;
}

.match-display__progress {
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
}

.match-display__party-name {
  font-weight: bold;
  color: #000;
  position: relative;
  display: block;
  padding: 1em;
}

.match-display__percentage {
  color: #000;
  position: absolute;
  display: block;
  padding: 1em;
  top: 0;
  right: 0;
  bottom: 0;
  [dir='rtl'] & {
    right: unset;
    left: 0;
  }
}

.match-display__party-description {
  margin-bottom: 2.5em;
  color: #744210;
  font-size: 0.875em;
  @media (min-width: 40em) {
    font-size: 1em;
  }
}
</style>
