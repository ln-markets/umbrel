<template>
  <button
    class="button whitespace-nowrap"
    :disabled="disabled"
    :class="colorClass"
  >
    <slot></slot>
  </button>
</template>

<script>
import { computed } from '@vue/runtime-core'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },

  setup(props) {
    const colorClass = computed(() => {
      switch (props.color) {
        case 'red':
          return 'bg-red-500 hover:bg-red-600 active:bg-red-600'
        case 'green':
          return 'bg-green-500 hover:bg-green-600 active:bg-green-600'
        default:
          return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-600'
      }
    })

    return {
      colorClass,
    }
  },
}
</script>

<style lang="postcss" scoped>
.button {
  @apply text-gray-100;
  @apply text-center font-bold px-2 py-2;
  @apply rounded shadow outline-none;
  @apply cursor-pointer;

  transition: all 0.15s ease;
}

.button:hover:not([disabled]) {
  @apply shadow-md;
}

.button:focus {
  @apply outline-none;
}

.button:disabled {
  @apply bg-gray-400 text-gray-900 cursor-not-allowed;
}

.button:hover:disabled {
  @apply bg-gray-400 text-gray-900 cursor-not-allowed;
}
</style>
