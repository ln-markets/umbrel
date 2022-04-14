<template>
  <div class="section profile-card">
    <div class="profile-details">
      <span class="font-bold">{{ username }}</span>
    </div>
    <div class="profile-stats">
      <ul>
        <li>
          <span class="font-bold">{{
            total_positions.toLocaleString('en')
          }}</span>
          Positions
        </li>
        <li>
          <span class="font-bold">{{
            total_deposit_success_count.toLocaleString('en')
          }}</span>
          Deposits
        </li>
        <li>
          <span class="font-bold">{{
            total_withdraw_success_count.toLocaleString('en')
          }}</span>
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
      username: computed(() => store.state.user.username),
      total_deposit_success_count: computed(
        () => store.state.user.total_deposit_success_count
      ),
      total_withdraw_success_count: computed(
        () => store.state.user.total_withdraw_success_count
      ),
      total_positions: computed(() => store.getters['user/positionCount'] + 0), //WIP
    }
  },
}
</script>
