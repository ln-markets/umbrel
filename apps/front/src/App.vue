<template>
  <div class="app-container">
    <nav-header />
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    store.dispatch('user/get')
    store.dispatch('user/transactionHistory')
    store.dispatch('futures/get')

    return {}
  },
}
</script>

<style lang="postcss" scoped>
.app-container {
  @apply flex flex-col h-full p-0 m-0 overflow-auto bg-gray-100 text-gray-800;
}
</style>
