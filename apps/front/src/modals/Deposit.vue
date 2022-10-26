<template>
  <lnm-umbrel-modal>
    <template #title>Deposit to LN Markets</template>
    <template #content>
      <div v-if="!waiting">
        <p class="mb-4 text-sm text-center sm:text-base">
          Input the amount to deposit below (no limits).
        </p>
        <div class="flex justify-center mt-4">
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
      <div v-else>
        <Loader class="mx-auto w-64 h-64" />
      </div>
    </template>
    <template #footer>
      <div v-if="!waiting" class="flex justify-around w-full">
        <lnm-umbrel-button class="w-1/3 sm:w-1/4" @click="$emit('close')">
          Close
        </lnm-umbrel-button>
        <lnm-umbrel-button
          class="w-1/3 sm:w-1/4"
          color="green"
          :disabled="!amount || parseInt(amount) < 1000"
          :click="deposit"
          :click-params="amount"
        >
          Deposit
        </lnm-umbrel-button>
      </div>
      <div v-else>Processing deposit...</div>
    </template>
  </lnm-umbrel-modal>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { isInteger } from '@/plugins/utils.js'
import Loader from '@/components/Loader.vue'

export default {
  name: 'ModalDeposit',
  emits: ['close'],
  setup() {
    const store = useStore()
    const waiting = ref(false)
    return {
      amount: ref(1000),
      waiting,
      deposit: (amount) => {
        waiting.value = true
        store.dispatch('user/deposit', parseInt(amount))
      },
    }
  },

  methods: {
    isInteger,
  },
  components: { Loader },
}
</script>
