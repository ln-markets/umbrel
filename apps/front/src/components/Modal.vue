<template>
  <div
    class="flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center bg-black bg-opacity-40"
  >
    <div
      class="flex flex-col w-5/6 lg:w-2/3 overflow-x-auto shadow-2xl bg-white rounded-md"
    >
      <header
        class="text-2xl sm:text-3xl font-bold p-4 border-b-2 text-center bg-gray-100"
      >
        {{ title }}
      </header>
      <section class="p-4">
        <slot name="body"></slot>
      </section>
      <footer class="flex justify-around py-4 border-t-2 bg-gray-100 h-18">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    return {}
  },
}
</script>
