<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="bg-opacity/100 fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-200">
                Account Migration
              </DialogTitle>
              <div class="mt-2 space-y-1 text-sm text-gray-300">
                <p>
                  Your account is empty?
                </p>
                <p>
                  Login to your old account and send funds to your new account.
                </p>
                <p >
                  If you need some help, please reach out to us on <a class="cursor-pointer font-semibold hover:text-yellow-600" href="https://t.me/lnmarkets">Telegram</a>!
                </p>
              </div>

              <div class="mt-4 flex w-full justify-evenly">
                <UmbrelButton :icon="ArrowRightOnRectangleIcon" :click="deprecated">
                    Login old account
                </UmbrelButton>

                 <UmbrelButton :icon="ArrowRightOnRectangleIcon" :click="correct">
                    Login new account
                </UmbrelButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import UmbrelButton from './Button.vue'

import { correct, deprecated } from './utils.js'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

defineExpose({ openModal })
</script>

<script>
export default { name: 'ModalHelp' }
</script>
