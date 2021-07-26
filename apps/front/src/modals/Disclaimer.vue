<template>
  <modal :title="'Welcome to LN Markets app on Umbrel'">
    <template #body>
      <p class="text-center text-sm sm:text-base py-1">
        Start mananing your LN Markets account directly from this pannel!
      </p>
      <p class="text-xs text-center">
        <i>This app may get extra features in the future...</i>
      </p>
    </template>
    <template #footer>
      <lnm-button class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
    </template>
  </modal>
</template>

<script>
export default {
  setup() {
    return {}
  },

  methods: {
    closeModal() {
      this.$store.dispatch('updateDisclaimer')
    },
  },
}
</script>

<style lang="postcss" scoped>
.info-row {
  @apply flex flex-row justify-between text-xs overflow-x-auto;
  @apply sm:text-xs md:text-sm;
  @apply sm:mx-4 lg:mx-8 xl:mx-16;
}
</style>
