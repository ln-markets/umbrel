<template>
  <lnm-umbrel-modal>
    <template #title>Withdraw from LN Markets</template>
    <template #content>
      <div v-if="!waiting">
        <p class="mb-4 text-sm text-center sm:text-base">
          Select the amount to withdraw using one of the options below.
        </p>
        <div class="flex justify-center">
          <lnm-umbrel-slider
            class="w-1/2"
            :min="1000"
            :max="balance"
            :value="parseInt(amount)"
            :step="(balance - 1000) / 1000"
            @update="amount = parseInt($event)"
          />
        </div>
        <div class="flex justify-center mt-4">
          <lnm-umbrel-button class="mr-4" @click="amount = balance">
            Max
          </lnm-umbrel-button>
          <input
            v-model="amount"
            class="pr-2 w-1/2 text-sm text-right rounded border-2 border-gray-300 sm:w-auto"
            inputmode="decimal"
            placeholder="Amount"
            @keypress="isInteger($event)"
          />
          <p class="mt-2 ml-1">sats</p>
        </div>
      </div>
      <div v-else><Loader class="mx-auto w-64 h-64" /></div>
    </template>
    <template #footer>
      <div v-if="!waiting" class="flex justify-around w-full">
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
      </div>
      <div v-else>Processing withdrawal...</div>
    </template>
  </lnm-umbrel-modal>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { isInteger } from '@/plugins/utils.js'
import Loader from '@/components/Loader.vue'

export default {
  name: 'ModalWithdraw',
  emits: ['close'],
  setup() {
    const store = useStore()
    const waiting = ref(false)
    return {
      balance: computed(() => store.state.user.account.available_balance),
      amount: ref(1000),
      waiting,
      withdraw: (amount) => {
        waiting.value = true
        store.dispatch('user/withdraw', parseInt(amount))
      },
    }
  },
  methods: {
    isInteger,
  },
  components: { Loader },
}
</script>
