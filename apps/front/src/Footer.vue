<template>
  <div class="flex w-full flex-row items-center justify-between p-4">
    <div class="flex flex-col text-xs">
      <div>LN Markets v2.0.0</div>
    </div>
    <div class="flex w-48 flex-row items-center justify-between">
      <a
        aria-label="Discord"
        class="social-icon size-7"
        href="https://discord.gg/5HwDJFx2Jz"
        rel="noopener"
        target="_blank"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <title>Discord</title>
          <path
            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
          />
        </svg>
      </a>
      <a
        aria-label="Telegram"
        class="social-icon size-6"
        href="https://www.t.me/lnmarkets"
        rel="noopener"
        target="_blank"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <title>Telegram</title>
          <path
            d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
          />
        </svg>
      </a>
      <a
        aria-label="Github"
        class="social-icon size-7"
        href="https://github.com/lnmarkets/umbrel"
        rel="noopener"
        target="_blank"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <title>Github</title>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
          ></path>
        </svg>
      </a>
      <a
        aria-label="Twitter"
        class="social-icon size-7"
        href="https://twitter.com/LNMarkets"
        rel="noopener"
        target="_blank"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <title>Twitter</title>
          <path
            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          />
        </svg>
      </a>
      <a
        aria-label="Substack"
        class="social-icon size-6"
        href="https://lnmarkets.substack.com/"
        rel="noopener"
        target="_blank"
      >
        <svg
          class="block h-full"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10000 10000"
        >
          <g fill="currentColor" fill-rule="evenodd" opacity="1">
            <path
              id="svg_1"
              d="m721.67415,7258.19578l4.91612,-2708.78271l4326.18655,0l4326.18655,0l4.91612,2710.42142c3.27741,2348.26717 0,2707.14401 -19.66448,2700.58918c-19.66448,-8.19354 -4132.81912,-2302.38337 -4272.10922,-2382.68002c-40.96768,-24.58061 -88.49018,1.63871 -2200.78354,1181.50777c-1186.42389,663.67635 -2161.45457,1206.08837 -2164.73198,1206.08837c-4.91612,0 -6.55483,-1219.19803 -4.91612,-2707.14401z"
            />
            <path
              id="svg_2"
              d="m718.39674,2918.89958l0,-589.93453l4326.18655,0l4326.18655,0l0,589.93453l0,589.93453l-4326.18655,0l-4326.18655,0l0,-589.93453z"
            />
            <path
              id="svg_3"
              d="m718.39674,698.45156l0,-581.74099l4326.18655,0l4326.18655,0l0,581.74099l0,581.74099l-4326.18655,0l-4326.18655,0l0,-581.74099z"
            />
          </g>
        </svg>
      </a>
    </div>
    <UmbrelButton :click="openHelp">Help</UmbrelButton>
  </div>
  <ModalHelp ref="modalHelpRef" />
</template>

<script setup>
import { ref } from 'vue'

import ModalHelp from './Help.vue'
import UmbrelButton from './Button.vue'

const modalHelpRef = ref(null)

const openHelp = () => {
  modalHelpRef.value.openModal()
}
</script>

<script>
export default { name: 'UmbrelFooter' }
</script>

<style scoped>
.social-icon {
  @apply inline text-blue-600 hover:text-blue-500;
}
</style>
