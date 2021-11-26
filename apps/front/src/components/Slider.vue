<template>
  <input
    class="range"
    type="range"
    :step="step"
    :min="min"
    :max="max"
    :value="value"
    @input="$emit('update', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'LnmSlider',
  props: {
    value: {
      default: 0,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: 1000,
      type: Number,
    },
    step: {
      default: 100,
      type: Number,
    },
  },

  emits: ['update'],

  setup(props) {
    return {}
  },
}
</script>

<style lang="postcss" scoped>
.range input[type='range'] {
  @apply block m-2 p-0;
}

.range input[type='range']:focus {
  @apply outline-none;
}

.range input[type='range']::-webkit-lnmslider-thumb {
  @apply relative w-8 h-8 z-10 rounded-full border-0 cursor-pointer;

  background-color: green;
  transition: background 0.1s linear;
}

.range input[type='range']::-moz-range-thumb {
  @apply relative w-8 h-8 z-10 rounded-full border-0 cursor-pointer;

  background-color: green;
  transform: translateZ(1px);
  transition: background-color 0.1s linear;
}

.range input[type='range']::-moz-focus-outer {
  border: 0;
}
</style>
