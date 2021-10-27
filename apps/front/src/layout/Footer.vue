<template>
  <div class="flex flex-row justify-between items-center p-4 w-full">
    <div class="flex flex-col text-xs">
      <div>
        <a
          class="text-primary hover:text-link"
          href="https://lnmarkets.com"
          rel="noopener"
          target="_blank"
        >
          LN Markets
        </a>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center w-36">
      <a
        aria-label="Telegram"
        class="text-3xl social-icon"
        href="https://www.t.me/lnmarkets"
        rel="noopener"
        target="_blank"
      >
        <font-awesome-icon :icon="['fab', 'telegram']" />
      </a>
      <a
        aria-label="Github"
        class="text-3xl social-icon"
        href="https://github.com/lnmarkets/umbrel"
        rel="noopener"
        target="_blank"
      >
        <font-awesome-icon :icon="['fab', 'github']" />
      </a>
      <a
        aria-label="Twitter"
        class="text-3xl social-icon"
        href="https://twitter.com/LNMarkets"
        rel="noopener"
        target="_blank"
      >
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
      <a
        aria-label="Substack"
        class="w-7 h-7 social-icon"
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
  </div>
</template>

<script>
export default {
  name: 'Footer',

  setup() {
    return {}
  },
}
</script>

<style lang="postcss" scoped>
.social-icon {
  @apply inline text-primary hover:text-link;
}
</style>
