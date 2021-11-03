<template>
  <div class="mx-auto w-5/6 sm:w-2/3 section">
    <p class="text-xl font-bold text-center">Market Data</p>
    <hr />
    <div class="category-row">
      <span
        >Index: <b>{{ withCommasAndFixed(index) }}</b></span
      >
      <span
        >Bid: <b>{{ withCommasAndFixed(bid) }}</b></span
      >
      <span
        >Offer: <b>{{ withCommasAndFixed(offer) }}</b></span
      >
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { withCommasAndFixed } from '@/plugins/utils.js'

export default {
  name: 'LnmUmbrelMarketData',
  setup() {
    const store = useStore()
    return {
      index: computed(() => store.getters['futures/market/fixedIndex']),
      bid: computed(() => store.state.futures.market.bid),
      offer: computed(() => store.state.futures.market.offer),
    }
  },
  methods: {
    withCommasAndFixed,
  },
}
</script>
