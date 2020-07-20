<template>
  <div class="mb-4" role="figure">
    <div
      class="bg-yellow-600 rounded overflow-hidden relative mb-4"
      role="img"
      :aria-label="$t('match-aria', {
        party: $t(`parties.${party.index}.name`),
        percentage: Math.round(percentage * 100),
      })"
    >
      <div class="bg-white absolute top-0 bottom-0" :style="`width:${percentage * 100}%`"></div>
      <span
        class="
          font-bold text-black relative block p-4
        "
      >
        {{ $t(`parties.${party.index}.short`) }}
      </span>
      <span
        class="
          text-black absolute block p-4 right-0 top-0 bottom-0
        "
      >
        {{ $n(percentage, 'percentage') }}
      </span>
    </div>
    <p
      class="mb-10 text-yellow-900 text-sm sm:text-base"
    >
      <show-more :length="500" :text="$t(`parties.${party.index}.description`)" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'Match',
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

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "match-aria": "Your match for the party '{party}' is at {percentage} %"
  },
  "de": {
    "match-aria": "Deine Übereinstimmung mit den Positionen der Partei '{party}' liegt bei {percentage} %"
  }
}
</i18n>
<!-- eslint-enable max-len -->
