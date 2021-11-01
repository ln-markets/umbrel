<template>
  <div class="app-container">
    <nav-header />
    <lnm-umbrel-notifications />
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import NavFooter from '@/layout/Footer.vue'
import NavHeader from '@/layout/Header.vue'

export default {
  components: { NavFooter, NavHeader },
  setup() {
    const store = useStore()

    const getUser = () => store.dispatch('user/get')
    const getFutures = () => store.dispatch('futures/get')
    const updateProfileInterval = () => store.dispatch('updateProfileInterval')

    onMounted(() => {
      getUser().then(() => {
        getFutures()
        updateProfileInterval()
      })
    })

    return {
      getUser,
      getFutures,
      updateProfileInterval,
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
