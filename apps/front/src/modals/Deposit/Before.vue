<template>
  <modal :title="title">
    <template #body>
      <p class="mb-4 text-sm sm:text-base text-center">
        Select the amount to deposit using one of the options bellow.
      </p>
      <slider
        :min="1000"
        :max="max"
        :value="parseInt(amount)"
        :step="(max - 1000) / 1000"
        @update="amount = parseInt($event)"
      />
      <div class="flex justify-center mt-4">
        <lnm-button class="mr-4" @click="amount = max"> Max </lnm-button>
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
      <lnm-button :color="'red'" class="w-1/3 sm:w-1/4" @click="closeModal">
        Close
      </lnm-button>
      <lnm-button
        class="w-1/3 sm:w-1/4"
        :color="'green'"
        :disabled="!amount || parseInt(amount) > max || parseInt(amount) < 1000"
        @click="submit"
      >
        Deposit
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
      max: computed(() => store.getters['user/maxDeposit']),
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
        await this.$store.dispatch('user/deposit', parseInt(this.amount))
      } catch (error) {
        console.log(error)
      } finally {
        this.amount = 1000
      }
    },
  },
}
</script>
