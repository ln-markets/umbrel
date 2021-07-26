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
            positions
          </li>
          <li>
            <span class="font-bold">{{ deposits.toLocaleString('en') }}</span>
            deposits
          </li>
          <li>
            <span class="font-bold">{{
              withdrawals.toLocaleString('en')
            }}</span>
            withdrawals
          </li>
        </ul>
      </div>
    </div>
    <div class="infos-container">
      <div class="section category">
        <p class="text-center font-bold text-xl">Account</p>
        <hr />
        <div class="category-row">
          <span>Balance</span>
          <span
            ><b>{{ balance.toLocaleString('en') }}</b> sats</span
          >
        </div>
        <hr />
        <div class="category-row">
          <span>UID</span>
          <span>{{ uid.substring(0, 13) }}...</span>
        </div>
      </div>
      <div class="section category">
        <p class="text-center font-bold text-xl">Positions</p>
        <hr />
        <div class="category-row">
          <span>Opened</span>
          <span
            ><b>{{ opened.toLocaleString('en') }}</b> positions</span
          >
        </div>
        <div class="category-row">
          <span>Running</span>
          <span
            ><b>{{ running.toLocaleString('en') }}</b> positions</span
          >
        </div>
        <div class="category-row">
          <span>Closed</span>
          <span
            ><b>{{ closed.toLocaleString('en') }}</b> positions</span
          >
        </div>
        <hr />
        <div class="category-row mb-1">
          <span>P&L</span>
          <span
            :class="pl > 0 ? 'text-green-500' : pl < 0 ? 'text-red-500' : ''"
          >
            <b>{{ pl.toLocaleString('en') }}</b> sats
          </span>
        </div>
      </div>
      <div class="section category">
        <p class="text-center font-bold text-xl">Actions</p>
        <hr />
        <div class="h-full">
          <lnm-button
            class="w-1/2 sm:w-1/3 block mx-auto mt-6 my-4"
            :color="'default'"
            :disabled="!balance || balance < 1000"
            @click="showWithdrawModal = true"
          >
            Withdraw
          </lnm-button>
          <lnm-button
            class="w-1/2 sm:w-1/3 block mx-auto my-4"
            :color="'default'"
            :disabled="maxDeposit < 1000"
            @click="showDepositModal = true"
          >
            Deposit
          </lnm-button>
          <lnm-button
            class="w-1/2 sm:w-1/3 block mx-auto my-4"
            :color="'default'"
            @click="toLNMarkets"
          >
            Trade
          </lnm-button>
        </div>
      </div>
    </div>
  </div>
  <deposit-modal v-model:showModal="showDepositModal" />
  <withdraw-modal v-model:showModal="showWithdrawModal" />
  <disclaimer-modal v-if="disclaimer" />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import Deposit from '../modals/Deposit/Index.vue'
import Withdraw from '../modals/Withdraw/Index.vue'
import Disclaimer from '../modals/Disclaimer.vue'

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
      username: computed(() => store.state.user.username),
      uid: computed(() => store.state.user.uid),
      balance: computed(() => store.state.user.balance),
      maxDeposit: computed(() => store.getters['user/maxDeposit']),
      deposits: computed(() => store.getters['user/depositCount']),
      withdrawals: computed(() => store.getters['user/withdrawalCount']),
      positions: computed(() => store.getters['futures/positionCount']),
      opened: computed(() => store.getters['futures/openedCount']),
      running: computed(() => store.getters['futures/runningCount']),
      closed: computed(() => store.getters['futures/closedCount']),
      pl: computed(() => store.getters['futures/computePL']),
      showDepositModal: ref(false),
      showWithdrawModal: ref(false),
    }
  },

  methods: {
    async toLNMarkets() {
      const token = await this.$store.dispatch('user/getAuthenticationToken')
      const { hostnameAPI: url } = await this.$store.dispatch('LNMarketsInfos')

      window.open(
        `https://${url.substring(12)}/login/token?token=${token}`,
        '_blank'
      )
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
  @apply w-2/3 m-auto;
  @apply xl:w-full;
}

.category-row {
  @apply flex flex-row justify-between text-xs px-2;
  @apply sm:px-8 sm:text-sm md:text-base;
}

.section {
  @apply bg-white p-2 shadow-lg my-4 rounded-md;
}

.profile-card {
  @apply w-5/6 mx-auto mt-8;
  @apply sm:w-1/2;
}
</style>
