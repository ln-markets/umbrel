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
    return {
      uid: computed(() => store.state.user.uid),
      balance: computed(() => store.state.user.balance),
    }
  },
}
</script>
