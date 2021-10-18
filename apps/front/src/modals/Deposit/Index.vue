<template>
  <div v-if="showModal">
    <before v-if="step === 'before'" :title="'Deposit'" @close="closeModal" />
    <waiting v-if="step === 'waiting'" :title="'Deposit'" />
    <after v-if="step === 'after'" :title="'Deposit'" @close="closeModal" />
    <faillure
      v-if="step === 'faillure'"
      :title="'Deposit'"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import before from './Before.vue'
import waiting from './Waiting.vue'
import after from './After.vue'
import faillure from './Faillure.vue'

export default {
  components: {
    before,
    waiting,
    after,
    faillure,
  },

  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:showModal'],

  setup() {
    const store = useStore()

    return {
      step: computed(() => store.state.user.transaction.step),
      transactionProcess: (infos) =>
        store.commit('user/TRANSACTION_PROCESS', infos),
    }
  },

  methods: {
    closeModal() {
      this.$emit('update:showModal', false)
      this.transactionProcess({
        step: 'before',
        amount: 0,
        id: null,
        payment: null,
        secret: null,
      })
    },
  },
}
</script>
