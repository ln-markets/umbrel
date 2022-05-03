<template>
  <div class="section category">
    <p class="text-xl font-bold text-center">Risk</p>
    <hr />
    <div class="risk-container">
      <div>
        <p class="text-xl font-bold text-center">Global</p>
        <hr />
        <div class="category-row-risk">
          <span>Quantity:</span>
          <span class="block"
            ><b>{{ quantity_global.toLocaleString('en') }}</b></span
          >
        </div>
        <div class="category-row-risk">
          <span>P&L:</span>
          <span
            class="block"
            :class="
              pl_global > 0
                ? 'text-green-500'
                : pl_global < 0
                ? 'text-red-500'
                : ''
            "
          >
            <b>{{ pl_global.toLocaleString('en') }}</b> sats
          </span>
        </div>
      </div>
      <div>
        <p class="text-xl font-bold text-center">Futures</p>
        <hr />
        <div class="category-row-risk">
          <span>Quantity:</span>
          <span class="block"
            ><b>{{ quantity_futures.toLocaleString('en') }}</b></span
          >
        </div>
        <div class="mb-1 category-row-risk">
          <span>P&L:</span>
          <span
            class="block"
            :class="
              pl_futures > 0
                ? 'text-green-500'
                : pl_futures < 0
                ? 'text-red-500'
                : ''
            "
          >
            <b>{{ pl_futures.toLocaleString('en') }}</b> sats
          </span>
        </div>
      </div>
      <div>
        <p class="text-xl font-bold text-center">Options</p>
        <hr />
        <div class="category-row-risk">
          <span>Delta:</span>
          <span class="block"
            ><b>{{ quantity_options.toLocaleString('en') }}</b></span
          >
        </div>
        <div class="mb-1 category-row-risk">
          <span>P&L:</span>
          <span
            class="block"
            :class="
              pl_options > 0
                ? 'text-green-500'
                : pl_options < 0
                ? 'text-red-500'
                : ''
            "
          >
            <b>{{ pl_options.toLocaleString('en') }}</b> sats
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { withCommasAndFixed } from '@/plugins/utils.js'

export default {
  name: 'LnmUmbrelRisk',

  setup() {
    const store = useStore()
    return {
      pl_global: computed(
        () =>
          store.getters['futures/computePL'] +
          store.getters['options/computePL']
      ),
      pl_futures: computed(() => store.getters['futures/computePL']),
      pl_options: computed(() => store.getters['options/computePL']),
      quantity_global: computed(() => store.getters['user/globalQuantity']),
      quantity_futures: computed(
        () =>
          store.state.user.metrics.futures.opened.quantity +
          store.state.user.metrics.futures.running.quantity
      ),
      quantity_options: computed(() => store.getters['options/computeDelta']),
    }
  },

  methods: {
    withCommasAndFixed,
  },
}
</script>

<style lang="postcss" scoped>
.risk-container {
  @apply grid grid-cols-3 text-xs;
  @apply sm:text-sm 2xl:text-base;
}

.category-row-risk {
  @apply text-center px-2;
  @apply md:flex md:flex-row md:justify-between md:text-right;
  @apply sm:px-6 md:px-4 lg:px-4 xl:px-1 2xl:px-4;
}
</style>
