<template>
  <div class="h-full">
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
            <span class="font-bold">{{
              withdrawals.toLocaleString('en')
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
            ><b>{{ opened.toLocaleString('en') }}</b> positions</span
          >
        </div>
        <div class="category-row">
          <span>Running:</span>
          <span
            ><b>{{ running.toLocaleString('en') }}</b> positions</span
          >
        </div>
        <div class="category-row">
          <span>Closed:</span>
          <span
            ><b>{{ closed.toLocaleString('en') }}</b> positions</span
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
          <lnm-button
            class="block my-4 mx-auto mt-6 w-1/2 sm:w-1/3"
            :color="'default'"
            :disabled="!balance || balance < 1000"
            @click="showWithdrawModal = true"
          >
            Withdraw
          </lnm-button>
          <lnm-button
            class="block my-4 mx-auto w-1/2 sm:w-1/3"
            :color="'default'"
            :disabled="maxDeposit < 1000"
            @click="showDepositModal = true"
          >
            Deposit
          </lnm-button>
          <lnm-button
            class="block my-4 mx-auto w-1/2 sm:w-1/3"
            :color="'default'"
            @click="toLNMarkets"
          >
            Trade
          </lnm-button>
        </div>
      </div>
    </div>
  </div>
  <deposit-modal :show-modal="showDepositModal" />
  <withdraw-modal :show-modal="showWithdrawModal" />
  <disclaimer-modal v-if="disclaimer" />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { withCommasAndFixed } from '@/plugins/utils.js'
import Deposit from '@/modals/Deposit/Index.vue'
import Withdraw from '@/modals/Withdraw/Index.vue'
import Disclaimer from '@/modals/Disclaimer.vue'

export default {
  components: {
    depositModal: Deposit,
    withdrawModal: Withdraw,
    disclaimerModal: Disclaimer,
  },

  setup() {
    const store = useStore()

    return {
      disclaimer: computed(() => store.state.disclaimer),
      username: computed(() => store.state.user.infos.username),
      uid: computed(() => store.state.user.infos.uid),
      balance: computed(() => store.state.user.infos.balance),
      maxDeposit: computed(() => store.getters['user/maxDeposit']),
      deposits: computed(() => store.state.user.stats.transactions.deposits),
      withdrawals: computed(
        () => store.state.user.stats.transactions.withdrawals
      ),
      positions: computed(() => store.getters['user/positionCount']),
      opened: computed(() => store.state.user.stats.positions.opened),
      running: computed(() => store.state.user.stats.positions.running),
      closed: computed(() => store.state.user.stats.positions.closed),
      pl: computed(() => store.getters['futures/computePL']),
      index: computed(() => store.getters['futures/market/fixedIndex']),
      bid: computed(() => store.state.futures.market.bid),
      offer: computed(() => store.state.futures.market.offer),
      showDepositModal: ref(false),
      showWithdrawModal: ref(false),
    }
  },

  methods: {
    withCommasAndFixed,
    async toLNMarkets() {
      const { token, hostname } = await this.$store.dispatch(
        'user/getAuthenticationToken'
      )

      window.open(`https://${hostname}/login/token?token=${token}`, '_blank')
    },
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
