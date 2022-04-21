<template>
  <div class="section category">
    <p class="text-xl font-bold text-center">Account</p>
    <hr />
    <div class="category-row">
      <span>Balance:</span>
      <span
        ><b>{{ balance.toLocaleString('en') }}</b> sats</span
      >
    </div>
    <div class="category-row">
      <span>Margin available:</span>
      <span
        ><b>{{ available_balance.toLocaleString('en') }}</b> sats</span
      >
    </div>
    <div class="category-row">
      <span>Margin used:</span>
      <span
        ><b>{{ margin_used.toLocaleString('en') }}</b> sats</span
      >
    </div>
    <hr />
    <div class="category-row">
      <span>UID:</span>
      <span class="ml-2 truncate">{{ uid }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LnmUmbrelAccount',

  setup() {
    const store = useStore()
    const margin_used = computed(() => store.getters['user/usedMargin']) // WIP
    const available_balance = computed(
      () => store.state.user.account.available_balance
    )

    return {
      available_balance,
      margin_used,
      uid: computed(() => store.state.user.account.uid),
      balance: computed(
        () =>
          available_balance.value +
          margin_used.value +
          store.getters['futures/computePL'] +
          store.getters['options/computePL']
      ),
    }
  },
}
</script>
