<template>
  <div class="app-container" :class="!showHeaderAndFooter ? 'h-full' : ''">
    <nav-header v-if="showHeaderAndFooter" />
    <router-view />
    <nav-footer v-if="showHeaderAndFooter" />
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
    const router = useRouter()

    const showHeaderAndFooter = computed(() => {
      return router.currentRoute.value.path === '/app'
    })

    return {
      router,
      showHeaderAndFooter,
    }
  },
}
</script>

<style scoped>
.app-container {
  @apply flex flex-col p-0 m-0 overflow-auto bg-gray-100 text-gray-800;
}

@media screen and (min-height: 740px), screen and (min-width: 1280px) {
  .app-container {
    height: 100%;
  }
}
</style>
