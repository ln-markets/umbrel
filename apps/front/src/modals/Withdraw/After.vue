<template>
  <modal :title="title">
    <template #body>
      <p class="text-center text-sm sm:text-base mb-4 text-green-500">
        You successfully withdrawed
        {{ transaction.amount.toLocaleString('en') }} sats from your account!
      </p>
      <div class="info-row">
        <span class="font-semibold mr-1 md:mr-0">ID</span>
        <span>{{ transaction.id }}</span>
      </div>
      <hr class="my-2 sm:mx-4 lg:mx-8 xl:mx-16" />
      <div class="info-row">
        <span class="font-semibold mr-1 md:mr-0">Hash</span>
        <span>{{ transaction.payment }}</span>
      </div>
      <hr class="my-2 sm:mx-4 lg:mx-8 xl:mx-16" />
      <div class="info-row">
        <span class="font-semibold mr-1 md:mr-0">Secret</span>
        <span>{{ transaction.secret }}</span>
      </div>
      <hr class="my-2 sm:mx-4 lg:mx-8 xl:mx-16" />
      <div class="info-row">
        <span class="font-semibold mr-1 md:mr-0">Fees</span>
        <span>{{ transaction.fee.toLocaleString('en') }} sats</span>
      </div>
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
      transaction: computed(() => store.state.user.transaction),
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
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
