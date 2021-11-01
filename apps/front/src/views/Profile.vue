<template>
  <div class="h-full">
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
    <div class="infos-container">
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
      <div class="section category">
        <p class="text-xl font-bold text-center">Positions</p>
        <hr />
        <div class="category-row">
          <span>Opened:</span>
          <span
            ><b>{{ total_open_positions.toLocaleString('en') }}</b>
            positions</span
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
          <span
            :class="pl > 0 ? 'text-green-500' : pl < 0 ? 'text-red-500' : ''"
          >
            <b>{{ pl.toLocaleString('en') }}</b> sats
          </span>
        </div>
      </div>
      <div class="section category">
        <p class="text-xl font-bold text-center">Actions</p>
        <hr />
        <div class="h-full">
          <lnm-umbrel-button
            class="block my-4 mx-auto mt-6 w-1/2 sm:w-1/3"
            :color="'default'"
            :disabled="!balance || balance < 1000"
            @click="showWithdrawModal = true"
          >
            Withdraw
          </lnm-umbrel-button>
          <lnm-umbrel-button
            class="block my-4 mx-auto w-1/2 sm:w-1/3"
            :color="'default'"
            :disabled="maxDeposit < 1000"
            @click="showDepositModal = true"
          >
            Deposit
          </lnm-umbrel-button>
          <lnm-umbrel-button
            class="block my-4 mx-auto w-1/2 sm:w-1/3"
            :color="'default'"
            @click="loginToLNMarkets"
          >
            Trade
          </lnm-umbrel-button>
        </div>
      </div>
    </div>
  </div>
  <modal-deposit v-model:showModal="showDepositModal" />
  <modal-withdraw v-model:showModal="showWithdrawModal" />
  <modal-disclaimer v-if="disclaimer" />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { withCommasAndFixed } from '@/plugins/utils.js'
import ModalDeposit from '@/modals/Deposit/Index.vue'
import ModalWithdraw from '@/modals/Withdraw/Index.vue'
import ModalDisclaimer from '@/modals/Disclaimer.vue'

export default {
  name: 'LnmUmbrelProfile',
  components: {
    ModalDeposit,
    ModalWithdraw,
    ModalDisclaimer,
  },

  setup() {
    const store = useStore()
    return {
      disclaimer: computed(() => store.state.disclaimer),
      username: computed(() => store.state.user.infos.username),
      uid: computed(() => store.state.user.infos.uid),
      balance: computed(() => store.state.user.infos.balance),
      maxDeposit: computed(() => store.getters['user/maxDeposit']),
      total_deposit_success_count: computed(
        () => store.state.user.infos.total_deposit_success_count
      ),
      total_withdraw_success_count: computed(
        () => store.state.user.infos.total_withdraw_success_count
      ),
      total_positions: computed(() => store.getters['user/positionCount']),
      total_open_positions: computed(
        () => store.state.user.infos.total_open_positions
      ),
      total_running_positions: computed(
        () => store.state.user.infos.total_running_positions
      ),
      total_closed_positions: computed(
        () => store.state.user.infos.total_closed_positions
      ),
      pl: computed(() => store.getters['futures/computePL']),
      index: computed(() => store.getters['futures/market/fixedIndex']),
      bid: computed(() => store.state.futures.market.bid),
      offer: computed(() => store.state.futures.market.offer),
      showDepositModal: ref(false),
      showWithdrawModal: ref(false),
      loginToLNMarkets: () => store.dispatch('user/loginToLNMarkets'),
    }
  },

  methods: {
    withCommasAndFixed,
  },
}
</script>

<style lang="postcss" scoped>
ul {
  @apply justify-around;
}

li {
  @apply inline-block m-1;
  @apply sm:mx-4 md:mx-8 md:text-sm;
}

hr {
  @apply mt-2 mb-4 mx-2;
  @apply sm:mx-8;
}

.profile-details {
  @apply text-xl my-2 text-center;
  @apply md:text-2xl;
}

.profile-stats {
  @apply my-2 text-center text-xs;
}

.infos-container {
  @apply xl:grid xl:grid-cols-3 xl:gap-8 xl:mx-8;
}

.category {
  @apply w-5/6 m-auto;
  @apply sm:w-2/3 xl:w-full;
}

.category-row {
  @apply flex flex-row justify-between text-xs px-2;
  @apply sm:px-8 md:text-sm 2xl:text-base;
}

.section {
  @apply bg-white p-2 shadow-lg my-4 rounded-md;
}

.profile-card {
  @apply w-5/6 mx-auto my-8;
  @apply sm:w-1/2;
}
</style>
