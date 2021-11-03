<template>
  <button
    class="whitespace-nowrap button"
    :disabled="disableButton"
    :class="colorClass"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'LnmUmbrelButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    click: {
      type: Function,
      default: undefined,
    },
    clickParams: {
      type: [Object, Array, String, Number],
      default() {
        return {}
      },
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
      clicked: ref(false),
      colorClass,
    }
  },
  computed: {
    disableButton() {
      return this.disabled || this.clicked
    },
  },

  methods: {
    onClick() {
      if (!this.click) return

      this.clicked = true
      const pr = this.click(this.clickParams)

      Promise.resolve(pr)
        .then(() => {
          this.clicked = false
        })
        .catch(() => {
          this.clicked = false
        })
    },
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
