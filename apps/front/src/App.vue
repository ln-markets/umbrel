<template>
  <div class="app-container">
    <nav-header />
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import NavFooter from '@/layout/Footer.vue'
import NavHeader from '@/layout/Header.vue'

export default {
  components: { NavFooter, NavHeader },
  setup() {
    const store = useStore()

    store.dispatch('user/get').then(() => {
      store.dispatch('futures/get')
    })

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
