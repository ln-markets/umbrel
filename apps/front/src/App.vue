<template>
  <div class="m-0 flex h-full flex-col overflow-auto bg-gray-800 text-gray-200">
    <NavHeader />

    

    <div class="flex grow flex-col items-center justify-center space-y-10">
  
          <div class="rounded-md bg-slate-900 p-4">
          <div class="flex">
            <div class="shrink-0">
              <InformationCircleIcon
                class="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div
              class="ml-3 flex flex-1 flex-col space-y-1 text-sm text-gray-200 md:flex md:justify-between"
            >
              <p>Full revamp of LN Markets App in progress!</p>
              <p>Meanwhile, please access your account clicking below</p>
            </div>
          </div>
        </div>
      <UmbrelButton :icon="ArrowRightOnRectangleIcon" :click="correct">
        Login with Umbrel
      </UmbrelButton>
    </div>

    
    
    <NavFooter />
  </div>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

import { InformationCircleIcon } from '@heroicons/vue/20/solid'
import { fetchWrapper } from './utils.js'

import NavFooter from './Footer.vue'
import NavHeader from './Header.vue'
import UmbrelButton from './Button.vue'


const correct = async () => {
  try {
    const { hostname, token } = await fetchWrapper({ path: '/correct' })
    window.open(`https://${hostname}/login/token?token=${token}`, '_blank')
  } catch (error) {
    console.error(error)
  }
}
</script>
