<template>
  <div class="h-full">
    <Profile />
    <MarketData />
    <div class="infos-container">
      <Account />
      <Positions />
      <Actions />
    </div>
  </div>
</template>

<script>
import MarketData from './MarketData.vue'
import Account from './Account.vue'
import Profile from './Profile.vue'
import Positions from './Positions.vue'
import Actions from './Actions.vue'

export default {
  name: 'LnmUmbrelProfile',
  components: {
    MarketData,
    Account,
    Profile,
    Positions,
    Actions,
  },

  setup() {
    return {}
  },
}
</script>

<style lang="postcss">
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
  @apply flex flex-row justify-between text-xs px-2;
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
