<template>
  <div class="flex h-full">
    <div class="m-auto">
      <img class="mx-auto mb-8 rounded-xl sm:mb-16" :src="image" />
      <h1 class="text-xl font-bold text-center sm:text-6xl">
        Welcome to LN Markets
      </h1>
      <p
        class="mt-2 mb-4 text-sm text-center text-gray-400 sm:mt-4 sm:mb-8 sm:text-base"
      >
        Enter the app password to access your dashboard
      </p>
      <div class="m-4 mx-auto mt-8 w-64 sm:mt-2 sm:w-96">
        <div class="relative w-full">
          <input
            class="py-2 pr-8 pl-2"
            id="password"
            name="password"
            placeholder="Password"
            autocomplete="autocomplete"
            :type="passwordType"
            v-model="password"
            @keyup.enter="login"
          />

          <span class="flex absolute inset-y-0 right-0 items-center pl-2 mr-2">
            <div
              class="p-1 focus:outline-none cursor-pointer focus:shadow-outline"
              @click="updateIcon"
            >
              <FontAwesomeIcon :icon="['far', icon]" />
            </div>
          </span>
        </div>
      </div>
      <lnm-umbrel-button
        class="block mx-auto w-48 sm:mt-8"
        :color="'green'"
        @click="login"
      >
        Login
      </lnm-umbrel-button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import image from '../../../public/favicon/android-chrome-192x192.png'

export default {
  name: 'LnmUmbrelAuth',
  setup() {
    const store = useStore()
    const passwordType = ref('password')
    const password = ref('')

    const updateIcon = () => {
      if (passwordType.value === 'text') {
        passwordType.value = 'password'
      } else {
        passwordType.value = 'text'
      }
    }

    return {
      updateIcon,
      passwordType,
      password,
      router: useRouter(),
      loginToUmbrelApp: () =>
        store.dispatch('user/loginToUmbrel', password.value),
      icon: computed(() =>
        passwordType.value === 'text' ? 'eye-slash' : 'eye'
      ),
      image,
    }
  },

  methods: {
    async login() {
      try {
        await this.loginToUmbrelApp()
        this.router.push({ path: '/app' })
      } catch (_) {}
    },
  },
}
</script>

<style scoped>
input {
  @apply block rounded-md w-full text-sm text-black p-4 shadow-lg;
}

input:hover {
  @apply border-blue-500 ring-0 border-opacity-75;
}

input:focus {
  @apply border-blue-500 ring-0;
}
</style>
