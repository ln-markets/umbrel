<template>
  <modal :title="title">
    <template #body>
      <p class="text-sm sm:text-base text-center text-red-500">
        An error occured during deposit. Please try again later.
      </p>
      <p class="text-xs text-center text-red-500">(Code: {{ errorCode }})</p>
    </template>
    <template #footer>
      <lnm-button :color="'red'" class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
    </template>
  </modal>
</template>

<script>
import { computed } from 'vue'
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
