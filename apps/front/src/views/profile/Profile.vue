<template>
  <div class="section profile-card">
    <div class="profile-details">
      <span class="font-bold">{{ username }}</span>
    </div>
    <div class="profile-stats">
      <ul>
        <li>
          <span class="font-bold">{{ positions.toLocaleString('en') }}</span>
          Positions
        </li>
        <li>
          <span class="font-bold">{{ deposits.toLocaleString('en') }}</span>
          Deposits
        </li>
        <li>
          <span class="font-bold">{{ withdrawals.toLocaleString('en') }}</span>
          Withdrawals
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LnmUmbrelProfile',

  setup() {
    const store = useStore()
    return {
      username: computed(() => store.state.user.account.username),
      deposits: computed(() => store.state.user.metrics.transactions.deposits),
      withdrawals: computed(
        () => store.state.user.metrics.transactions.withdrawals
      ),
      positions: computed(() => store.getters['user/positionsCount']),
    }
  },
}
</script>
