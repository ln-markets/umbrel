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
    store.dispatch('futures/get')

    setTimeout(() => {
      store.dispatch('futures/market/subscribeToMarketData')
    }, 250)
    return {}
  },
}
</script>

<style lang="postcss" scoped>
.app-container {
  @apply flex flex-col p-0 m-0 overflow-auto bg-gray-100 text-gray-800;
}

@media screen and (min-height: 720px), screen and (min-width: 1280px) {
  .app-container {
    height: 100%;
  }
}
</style>
