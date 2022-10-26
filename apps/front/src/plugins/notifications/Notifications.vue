<template>
  <div class="feed">
    <template v-for="n of list" :key="n.id">
      <div
        :id="n.id"
        class="notification"
        :class="[style(n.type), clickToClose ? 'cursor-pointer' : '']"
        @click="click(n.id)"
      >
        <XMarkIcon
          class="semi-bold close-button w-5 h-5 text-white"
          aria-hidden="true"
        />
        <div class="container">
          <div class="icon" :class="[iconBg(n.type)]">
            <ExclamationCircleIcon
              v-if="n.type === 'error'"
              class="w-6 h-6"
              style="position: relative; top: calc(50% - 12px)"
            />
            <CheckCircleIcon
              v-if="n.type === 'success'"
              class="w-6 h-6"
              style="position: relative; top: calc(50% - 12px)"
            />
            <QuestionMarkCircleIcon
              v-if="!/^error|success$/.test(n.type)"
              class="w-6 h-6"
              style="position: relative; top: calc(50% - 12px)"
            />
          </div>
          <div class="content" v-html="n.message" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import events from './events.js'
import {
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'LnmNotifications',
  props: {
    reverse: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
    textDuration: {
      type: Boolean,
      default: false,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    XMarkIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    QuestionMarkCircleIcon,
  },

  data() {
    return {
      id: 0,
      list: [],
    }
  },
  computed: {
    style() {
      return (type) => {
        if (type === 'error') {
          return 'bg-red-500'
        } else if (type === 'success') {
          return 'bg-green-500'
        } else {
          return 'bg-blue-500'
        }
      }
    },
    iconBg() {
      return (type) => {
        if (type === 'error') {
          return 'bg-red-600'
        } else if (type === 'success') {
          return 'bg-green-600'
        } else {
          return 'bg-blue-600'
        }
      }
    },
    formatType(type) {
      return `${type[0].toUpperCase()}${type.slice(1)}!`
    },
  },
  created() {
    events.on('add', this.add)
  },
  methods: {
    add({ type, message, duration, showType }) {
      if (!duration) {
        duration = this.textDuration ? this.timeShown(message) : this.duration
      }

      const id = JSON.parse(JSON.stringify(this.id))

      const notification = {
        id,
        type,
        message,
        showType: showType === true,
      }

      if (this.reverse) {
        this.list.unshift(notification)
      } else {
        this.list.push(notification)
      }

      setTimeout(() => {
        this.remove(id)
      }, duration)

      this.id++
    },

    remove(id) {
      const index = this.list.map((e) => e.id).indexOf(id)
      const notification = document.getElementById(id)

      if (index >= 0) {
        if (notification) {
          notification.classList.add('animate-out')
        }
        setTimeout(() => {
          this.list.splice(index, 1)
        }, 250)
      }
    },

    click(id) {
      if (this.clickToClose) {
        this.remove(id)
      }
    },

    timeShown(text) {
      const config = { wpm: 180, wlength: 5 }
      const words = text.length / config.wlength
      const readingTime = (words / config.wpm) * 60000

      return readingTime + 1000
    },
  },
}
</script>

<style lang="postcss" scoped>
.type {
  @apply text-xs py-1;
}

.feed {
  @apply fixed w-11/12 md:w-2/5 lg:w-2/5 xl:w-3/12;
  @apply top-16 right-5 sm:right-4;
  @apply text-white font-medium;

  z-index: 1000;
}

.notification {
  @apply text-sm mb-1;
  @apply rounded-md shadow-lg;

  transition: all 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
  animation: slide-in 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.container {
  @apply flex flex-row content-center;
}

.icon {
  @apply rounded-l-md float-left p-3;
}

.content {
  @apply flex-grow float-left p-4;
}

.close-button {
  @apply absolute right-2 cursor-pointer mt-2;
  @apply hover:text-gray-800;
}

.close-button:hover {
  @apply text-gray-200;
}

.animate-out {
  animation: fade-out 0.3s cubic-bezier(0.2, 0.7, 0.3, 1);
}

@keyframes fade-out {
  to {
    opacity: 0;
    transform: translateX(500px);
  }
}

@keyframes slide-in {
  from {
    transform: translateX(2000px);
  }

  to {
    transform: translateX(0);
  }
}
</style>
