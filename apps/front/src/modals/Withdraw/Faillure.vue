<template>
  <modal :title="title">
    <template #body>
      <p class="text-center text-sm sm:text-base text-red-500">
        An error occured during withdraw. Please try again later.
      </p>
    </template>
    <template #footer>
      <lnm-button :color="'red'" class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['close'],

  setup() {
    return {}
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
