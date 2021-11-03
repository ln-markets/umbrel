<template>
  <div class="app-container">
    <nav-header />
    <router-view />
    <nav-footer />
  </div>
  <lnm-umbrel-notifications />
  <modals-container />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import NavFooter from '@/layout/Footer.vue'
import NavHeader from '@/layout/Header.vue'
import { ModalsContainer } from 'vue-final-modal'

export default {
  components: { NavFooter, NavHeader, ModalsContainer },
  setup() {
    const store = useStore()

    const getUser = () => store.dispatch('user/get')
    const getFutures = () => store.dispatch('futures/get')
    const updateProfileInterval = () =>
      store.dispatch('user/updateProfileInterval')
    const showDisclaimer = () => store.dispatch('showDisclaimer')

    onMounted(() => {
      showDisclaimer()
      getUser().then(() => {
        getFutures()
        updateProfileInterval()
      })
    })

    return {
      getUser,
      getFutures,
    }
  },
}
</script>

<style lang="postcss" scoped>
.app-container {
  @apply flex flex-col p-0 m-0 overflow-auto bg-gray-100 text-gray-800;
}

@media screen and (min-height: 740px), screen and (min-width: 1280px) {
  .app-container {
    height: 100%;
  }
}
</style>
