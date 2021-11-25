<template>
  <div class="app-container" :class="isLandingPage ? 'h-full' : ''">
    <nav-header v-if="!isLandingPage" />
    <router-view />
    <nav-footer v-if="!isLandingPage" />
  </div>
  <lnm-umbrel-notifications />
  <modals-container />
</template>

<script>
import { useRouter } from 'vue-router'

import NavFooter from '@/layout/Footer.vue'
import NavHeader from '@/layout/Header.vue'
import { ModalsContainer } from 'vue-final-modal'
import { computed } from 'vue'

export default {
  components: { NavFooter, NavHeader, ModalsContainer },
  setup() {
    const routeur = useRouter()

    const isLandingPage = computed(() => {
      return routeur.currentRoute.value.path === '/'
    })

    return {
      routeur,
      isLandingPage,
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
