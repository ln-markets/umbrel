<template>
  <div class="section profile-card">
    <div class="profile-details">
      <span class="font-bold">{{ username }}</span>
    </div>
    <hr />
    <div class="profile-stats">
      <p class="text-lg font-bold text-center">Futures</p>
      <ul>
        <li>
          All time PL:
          <span class="font-bold">{{ futuresPL.toLocaleString('en') }}</span>
          sats
        </li>
        <li>
          Traded quantity:
          <span class="font-bold">{{
            futuresQuantity.toLocaleString('en')
          }}</span>
          $
        </li>
        <li>
          Traded margin:
          <span class="font-bold">{{
            futuresMargin.toLocaleString('en')
          }}</span>
          sats
        </li>
      </ul>
    </div>
    <hr />
    <div class="profile-stats">
      <p class="text-lg font-bold text-center">Options</p>
      <ul>
        <li>
          All time PL:
          <span class="font-bold">{{ optionsPL.toLocaleString('en') }}</span>
          sats
        </li>
        <li>
          All time quantity:
          <span class="font-bold">{{
            optionsQuantity.toLocaleString('en')
          }}</span>
          $
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
      futuresQuantity: computed(
        () =>
          store.state.user.metrics.futures.running.quantity +
          store.state.user.metrics.futures.closed.quantity
      ),
      futuresMargin: computed(
        () =>
          store.state.user.metrics.futures.running.margin +
          store.state.user.metrics.futures.closed.margin
      ),
      futuresPL: computed(() => store.state.user.metrics.futures.closed.pl),
      optionsPL: computed(() => store.state.user.metrics.options.closed.pl),
      optionsQuantity: computed(
        () =>
          store.state.user.metrics.options.running.quantity +
          store.state.user.metrics.options.closed.quantity
      ),
    }
  },
}
</script>
