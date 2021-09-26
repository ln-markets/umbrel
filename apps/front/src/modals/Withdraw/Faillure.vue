<template>
  <modal :title="title">
    <template #body>
      <p class="text-center text-sm sm:text-base text-red-500">
        An error occured during withdraw. Please try again later.
      </p>
      <p class="text-center text-xs text-red-500">(Code: {{ errorCode }})</p>
    </template>
    <template #footer>
      <lnm-button :color="'red'" class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
    </template>
  </modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['close'],

  setup() {
    const store = useStore()

    return {
      errorCode: computed(() => store.state.errorCode),
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
