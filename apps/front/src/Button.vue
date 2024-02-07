<template>
  <button
    type="button"
    class="inline-flex items-center gap-x-2 rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
    :disabled="disabled"
    @click="buttonClick"
  >
    <slot>Button Text</slot>
    <component
      :is="icon"
      v-if="icon"
      class="-mr-0.5 size-5"
      aria-hidden="true"
    />
  </button>
</template>

<script setup>
import { ref } from 'vue'

const properties = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
    default: undefined,
  },
  click: {
    type: Function,
    default: undefined,
  },
})

const clicked = ref(false)

const buttonClick = () => {
  if (properties.click) {
    if (clicked.value) return

    clicked.value = true
    const pr = properties.click()

    Promise.resolve(pr)
      .then(() => {
        clicked.value = false
        return false
      })
      .catch(() => {
        clicked.value = false
      })
  }
}
</script>

<script>
export default { name: 'UmbrelButton' }
</script>
