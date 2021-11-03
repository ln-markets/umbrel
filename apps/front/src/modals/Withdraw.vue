<template>
  <lnm-umbrel-modal>
    <template #title>Withdraw from LN Markets</template>
    <template #content>
      <p class="mb-4 text-sm sm:text-base text-center">
        Select the amount to withdraw using one of the options bellow.
      </p>
      <lnm-umbrel-slider
        :min="1000"
        :max="balance"
        :value="parseInt(amount)"
        :step="(balance - 1000) / 1000"
        @update="amount = parseInt($event)"
      />
      <div class="flex justify-center mt-4">
        <lnm-umbrel-button class="mr-4" @click="amount = balance">
          Max
        </lnm-umbrel-button>
        <input
          v-model="amount"
          class="pr-2 w-1/2 sm:w-auto text-sm text-right rounded border-2 border-gray-300"
          inputmode="decimal"
          placeholder="Amount"
          @keypress="isInteger($event)"
        />
        <p class="mt-2 ml-1">sats</p>
      </div>
    </template>
    <template #footer>
      <lnm-umbrel-button class="w-1/3 sm:w-1/4" @click="$emit('close')">
        Close
      </lnm-umbrel-button>
      <lnm-umbrel-button
        class="w-1/3 sm:w-1/4"
        color="green"
        :disabled="
          !amount || parseInt(amount) > balance || parseInt(amount) < 1000
        "
        :click="withdraw"
        :click-params="amount"
      >
        Withdraw
      </lnm-umbrel-button>
    </template>
  </lnm-umbrel-modal>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { isInteger } from '@/plugins/utils.js'

export default {
  name: 'ModalWithdraw',
  emits: ['close'],
  setup() {
    const store = useStore()

    return {
      balance: computed(() => store.state.user.balance),
      amount: ref(1000),
      withdraw: (amount) => store.dispatch('user/withdraw', amount),
    }
  },
  methods: {
    isInteger,
  },
}
</script>
