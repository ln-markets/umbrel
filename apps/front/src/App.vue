<template>
  <div class="m-0 flex h-full flex-col overflow-auto bg-gray-800 text-gray-200">
    <NavHeader />

    

    <div class="flex grow flex-col items-center justify-center space-y-10">
  
       
      <UmbrelButton :icon="ArrowRightOnRectangleIcon" :click="correct">
        Login with Umbrel
      </UmbrelButton>
    </div>

    
    
    <NavFooter />
  </div>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

import { correct } from './utils.js'

import NavFooter from './Footer.vue'
import NavHeader from './Header.vue'
import UmbrelButton from './Button.vue'
</script>
