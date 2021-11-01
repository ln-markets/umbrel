<template>
  <lnm-umbrel-modal title="Welcome to the LN Markets app on Umbrel">
    <template #body>
      <p class="py-1 text-sm sm:text-base text-center">
        Start managing your LN Markets account directly from this pannel!
      </p>
      <p class="text-xs text-center">
        <i>This app may get extra features in the future...</i>
      </p>
      <p class="text-xs text-center">
        <i
          >If you find any bugs or want a feature, contact us on
          <a href="https://www.t.me/lnmarkets" rel="noopener" target="_blank">
            Telegram
          </a>
          or open an issue on
          <a
            href="https://github.com/lnmarkets/umbrel"
            rel="noopener"
            target="_blank"
          >
            Github.
          </a>
        </i>
      </p>
    </template>
    <template #footer>
      <lnm-umbrel-button class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-umbrel-button>
    </template>
  </lnm-umbrel-modal>
</template>

<script>
export default {
  name: 'ModalDisclaimer',
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

a {
  @apply text-primary hover:text-link;
}
</style>
