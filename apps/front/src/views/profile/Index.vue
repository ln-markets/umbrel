<template>
  <div class="h-full">
    <Profile />
    <MarketData />
    <div class="infos-container">
      <Account />
      <Risk />
      <Actions />
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import MarketData from './MarketData.vue'
import Account from './Account.vue'
import Profile from './Profile.vue'
import Risk from './Risk.vue'
import Actions from './Actions.vue'

export default {
  name: 'LnmUmbrelProfile',
  components: {
    MarketData,
    Account,
    Profile,
    Risk,
    Actions,
  },

  setup() {
    const store = useStore()

    const getUser = () => store.dispatch('user/get')
    const getFutures = () => store.dispatch('futures/get')
    const getOptions = () => store.dispatch('options/get')
    const showDisclaimer = () => store.dispatch('showDisclaimer')
    const getConfiguration = () => store.dispatch('getConfiguration')
    const updateProfileInterval = () =>
      store.dispatch('user/updateProfileInterval')

    onBeforeMount(async () => {
      showDisclaimer()
      await getConfiguration()
      await getUser()
      await getFutures()
      await getOptions()
      updateProfileInterval()
    })
    return {
      getUser,
      getFutures,
      getOptions,
    }
  },
}
</script>

<style>
ul {
  @apply justify-around;
}

li {
  @apply inline-block m-1;
  @apply sm:mx-4 md:mx-8 md:text-sm;
}

hr {
  @apply mt-2 mb-4 mx-2;
  @apply sm:mx-8;
}

.profile-details {
  @apply text-xl my-2 text-center;
  @apply md:text-2xl;
}

.profile-stats {
  @apply my-2 text-center text-xs;
}

.infos-container {
  @apply xl:grid xl:grid-cols-3 xl:gap-8 xl:mx-8;
}

.category {
  @apply w-5/6 m-auto;
  @apply sm:w-2/3 xl:w-full;
}

.category-row {
  @apply text-center flex flex-row justify-between text-xs px-2;
  @apply sm:px-8 md:text-sm 2xl:text-base;
}

.section {
  @apply bg-white p-2 shadow-lg my-4 rounded-md;
}

.profile-card {
  @apply w-5/6 mx-auto my-8;
  @apply sm:w-1/2;
}
</style>
