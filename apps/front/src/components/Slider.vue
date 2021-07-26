<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    @input="$emit('update', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1000,
    },
    min: {
      type: Number,
      default: 1000,
    },
    max: {
      type: Number,
      default: 1000000,
    },
    step: {
      type: Number,
      default: 1000,
    },
  },

  emits: ['update'],

  setup(props) {
    return {}
  },
}
</script>

<style lang="postcss" scoped>
input[type='range'] {
  @apply block w-5/6 sm:w-1/2 mx-auto;
}

input[type='range']:focus {
  @apply outline-none;
}

input[type='range']::-webkit-lnmslider-thumb {
  @apply relative w-8 h-8 z-10 rounded-full border-0 cursor-pointer;

  background-color: green;
  transition: background 0.1s linear;
}

input[type='range']::-moz-range-thumb {
  @apply relative w-8 h-8 z-10 rounded-full border-0 cursor-pointer;

  background-color: green;
  transform: translateZ(1px);
  transition: background-color 0.1s linear;
}

input[type='range']::-moz-focus-outer {
  border: 0;
}
</style>
