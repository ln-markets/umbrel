<template>
  <div class="section category">
    <p class="text-xl font-bold text-center">Actions</p>
    <hr />
    <div class="h-full">
      <lnm-umbrel-button
        class="block my-4 mx-auto mt-6 w-1/2 sm:w-1/3"
        :disabled="!balance || balance < 1000"
        @click="showModalWithdraw"
      >
        Withdraw
      </lnm-umbrel-button>
      <lnm-umbrel-button
        class="block my-4 mx-auto w-1/2 sm:w-1/3"
        :disabled="maxDeposit < 1000"
        @click="showModalDeposit"
      >
        Deposit
      </lnm-umbrel-button>
      <lnm-umbrel-button
        class="block my-4 mx-auto w-1/2 sm:w-1/3"
        @click="loginToLNMarkets"
      >
        Trade
      </lnm-umbrel-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { $vfm } from 'vue-final-modal'

import ModalDeposit from '@/modals/Deposit.vue'
import ModalWithdraw from '@/modals/Withdraw.vue'

export default {
  name: 'LnmUmbrelActions',

  setup() {
    const store = useStore()
    return {
      balance: computed(() => store.state.user.balance),
      maxDeposit: computed(() => store.getters['user/maxDeposit']),
      loginToLNMarkets: () => store.dispatch('user/loginToLNMarkets'),
    }
  },

  methods: {
    showModalDeposit() {
      $vfm.show({
        component: ModalDeposit,
        bind: {
          name: 'ModalDeposit',
        },
        on: {
          close: () => {
            $vfm.hide('ModalDeposit')
          },
        },
      })
    },

    showModalWithdraw() {
      $vfm.show({
        component: ModalWithdraw,
        bind: {
          name: 'ModalWithdraw',
        },
        on: {
          close: () => {
            $vfm.hide('ModalWithdraw')
          },
        },
      })
    },
  },
}
</script>
