<template>
  <modal :title="title">
    <template #body>
      <p class="text-center text-sm sm:text-base mb-4">
        Select the amount to withdraw using one of the options bellow.
      </p>
      <slider
        :min="1000"
        :max="balance"
        :value="parseInt(amount)"
        @update="amount = parseInt($event)"
      />
      <div class="mt-4 flex justify-center">
        <lnm-button class="mr-4" @click="amount = balance"> Max </lnm-button>
        <input
          v-model="amount"
          class="border-2 border-gray-300 pr-2 text-right rounded text-sm w-1/2 sm:w-auto"
          inputmode="decimal"
          placeholder="Amount"
          @keypress="isInteger($event)"
        />
      </div>
    </template>
    <template #footer>
      <lnm-button :color="'red'" class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
      <lnm-button
        class="w-1/3 sm:w-1/4"
        :color="'green'"
        :disabled="
          !amount || parseInt(amount) > balance || parseInt(amount) < 1000
        "
        @click="submit"
      >
        Withdraw
      </lnm-button>
    </template>
  </modal>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import { isInteger } from '../../plugins/utils.js'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['close'],

  setup() {
    const store = useStore()

    return {
      balance: computed(() => store.state.user.balance),
      amount: ref(1000),
      isInteger,
    }
  },

  methods: {
    closeModal() {
      this.amount = 1000
      this.$emit('close')
    },

    async submit() {
      try {
        await this.$store.dispatch('user/withdraw', parseInt(this.amount))
        this.amount = 1000
      } catch (error) {
        console.log(error)
        this.amount = 1000
      }
    },
  },
}
</script>
