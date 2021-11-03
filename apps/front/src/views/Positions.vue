<template>
  <div class="section category">
    <p class="text-xl font-bold text-center">Positions</p>
    <hr />
    <div class="category-row">
      <span>Opened:</span>
      <span
        ><b>{{ total_open_positions.toLocaleString('en') }}</b> positions</span
      >
    </div>
    <div class="category-row">
      <span>Running:</span>
      <span
        ><b>{{ total_running_positions.toLocaleString('en') }}</b>
        positions</span
      >
    </div>
    <div class="category-row">
      <span>Closed:</span>
      <span
        ><b>{{ total_closed_positions.toLocaleString('en') }}</b>
        positions</span
      >
    </div>
    <hr />
    <div class="mb-1 category-row">
      <span>P&L:</span>
      <span :class="pl > 0 ? 'text-green-500' : pl < 0 ? 'text-red-500' : ''">
        <b>{{ pl.toLocaleString('en') }}</b> sats
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { withCommasAndFixed } from '@/plugins/utils.js'

export default {
  name: 'LnmUmbrelPositions',

  setup() {
    const store = useStore()
    return {
      total_open_positions: computed(
        () => store.state.user.total_open_positions
      ),
      total_running_positions: computed(
        () => store.state.user.total_running_positions
      ),
      total_closed_positions: computed(
        () => store.state.user.total_closed_positions
      ),
      pl: computed(() => store.getters['futures/computePL']),
    }
  },

  methods: {
    withCommasAndFixed,
  },
}
</script>
