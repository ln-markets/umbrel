<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1009.7 1009.7"
    xml:space="preserve"
  >
    <mask id="mask">
      <g>
        <polygon
          fill="#fff"
          points="196.4,344.6 283.7,344.6 219.8,583 396.1,583 230.8,823.3 283.1,659.5 111.4,659.5"
        />
      </g>
      <g>
        <polygon
          fill="#fff"
          points="817.9,344.6 710.4,466.5 669,344.6 667.9,344.6 581.8,344.6 581.5,344.6 534.3,519.6 452.4,344.6
			371.5,344.6 318.3,541.6 404.8,541.6 421.9,477.8 500.4,645.8 506.9,659.5 582.7,659.5 583.3,659.5 631.3,480.6 677.1,601.9
			678.9,601.9 791.8,478.6 743.7,659.5 830.5,659.5 915,344.6 		"
        />
      </g>
    </mask>

    <g mask="url(#mask)">
      <polygon
        class="yellow-fill fillAnimation"
        points="230.3,915.5 -95.4,915.5 -95.4,131.3 -95.4,131.3 "
      />
      <rect x="984.6" y="131.3" class="st0" width="25.1" height="784.2" />
    </g>

    <g mask="url(#mask)">
      <polygon
        class="white-fill fillAnimation"
        points="230.3,915.5 -95.4,915.5 -95.4,131.3 -95.4,131.3 "
      />
      <rect x="984.6" y="131.3" class="st0" width="25.1" height="784.2" />
    </g>

    <g mask="url(#mask)">
      <polygon
        class="yellow-fillBis fillAnimationBis"
        points="230.3,915.5 -95.4,915.5 -95.4,131.3 -95.4,131.3 "
      />
      <rect x="984.6" y="131.3" class="st0" width="25.1" height="784.2" />
    </g>

    <g mask="url(#mask)">
      <polygon
        class="white-fillBis fillAnimationBis"
        points="230.3,915.5 -95.4,915.5 -95.4,131.3 -95.4,131.3 "
      />
      <rect x="984.6" y="131.3" class="st0" width="25.1" height="784.2" />
    </g>

    <g>
      <g>
        <polygon
          class="white-stroke white-stroke1 strokeL"
          points="196.4,344.6 283.7,344.6 219.8,583 396.1,583 230.8,823.3 283.1,659.5 111.4,659.5"
        />
      </g>
      <g>
        <polygon
          class="white-stroke white-stroke1 strokeNM"
          points="817.9,344.6 710.4,466.5 669,344.6 667.9,344.6 581.8,344.6 581.5,344.6 534.3,519.6 452.4,344.6
			371.5,344.6 318.3,541.6 404.8,541.6 421.9,477.8 500.4,645.8 506.9,659.5 582.7,659.5 583.3,659.5 631.3,480.6 677.1,601.9
			678.9,601.9 791.8,478.6 743.7,659.5 830.5,659.5 915,344.6 		"
        />
      </g>
    </g>
    <g>
      <g>
        <polygon
          class="yellow-stroke strokeL"
          points="196.4,344.6 283.7,344.6 219.8,583 396.1,583 230.8,823.3 283.1,659.5 111.4,659.5"
        />
      </g>
      <g>
        <polygon
          class="yellow-stroke strokeNM"
          points="817.9,344.6 710.4,466.5 669,344.6 667.9,344.6 581.8,344.6 581.5,344.6 534.3,519.6 452.4,344.6
			371.5,344.6 318.3,541.6 404.8,541.6 421.9,477.8 500.4,645.8 506.9,659.5 582.7,659.5 583.3,659.5 631.3,480.6 677.1,601.9
			678.9,601.9 791.8,478.6 743.7,659.5 830.5,659.5 915,344.6 		"
        />
      </g>
    </g>

    <g>
      <g>
        <polygon
          class="white-stroke white-stroke2 strokeL"
          points="196.4,344.6 283.7,344.6 219.8,583 396.1,583 230.8,823.3 283.1,659.5 111.4,659.5"
        />
      </g>
      <g>
        <polygon
          class="white-stroke white-stroke2 strokeNM"
          points="817.9,344.6 710.4,466.5 669,344.6 667.9,344.6 581.8,344.6 581.5,344.6 534.3,519.6 452.4,344.6
			371.5,344.6 318.3,541.6 404.8,541.6 421.9,477.8 500.4,645.8 506.9,659.5 582.7,659.5 583.3,659.5 631.3,480.6 677.1,601.9
			678.9,601.9 791.8,478.6 743.7,659.5 830.5,659.5 915,344.6 		"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default { name: 'LnmLogoLoader' }
</script>

<style scoped>
.white-stroke {
  @apply stroke-yellow-400;

  fill: none;
  stroke-width: 7px;
  stroke-miterlimit: 5;
  stroke-dasharray: 2700;
  animation: strokeWhite 1500ms cubic-bezier(0, 0.6, 0.51, 0.88) forwards;
}

.strokeL {
  animation-duration: 5000ms;
}

@keyframes strokeWhite {
  0% {
    stroke-dashoffset: 3000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.yellow-stroke {
  @apply stroke-white;

  fill: none;
  stroke-width: 7px;
  stroke-miterlimit: 5;
  stroke-dasharray: 2700;
  animation: strokeWhite 1500ms cubic-bezier(0, 0.6, 0.51, 0.88) forwards;
  animation-delay: 0.3s;
}

.white-stroke2 {
  animation-delay: 0.4s;
}

@keyframes strokeWhite {
  0% {
    stroke-dashoffset: 3000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.fillAnimation {
  animation: fillAnimation 1s cubic-bezier(0, 0.6, 0.51, 0.88) backwards;
}

.fillAnimationBis {
  animation: fillAnimation 2100ms ease-in-out 1s infinite;
  animation-direction: alternate-reverse;
}

.yellow-fill {
  @apply stroke-white;
  stroke-miterlimit: 5;
  animation-delay: 1000ms;
  animation-fill-mode: backwards;
}

.yellow-fillBis {
  @apply stroke-white;
  stroke-miterlimit: 5;
  animation-delay: 4100ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.white-fill {
  @apply stroke-yellow-400;
  animation-delay: 1200ms;
  animation-fill-mode: backwards;
}

.white-fillBis {
  @apply stroke-yellow-400;
  animation-delay: 2200ms;
  animation-iteration-count: infinite;
}

@keyframes fillAnimation {
  0% {
    stroke-width: 0px;
  }
  100% {
    stroke-width: 1710px;
  }
}
</style>
