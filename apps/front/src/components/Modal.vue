<template>
  <div
    class="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center bg-black bg-opacity-40"
  >
    <div
      class="flex overflow-x-auto flex-col w-5/6 lg:w-2/3 bg-white rounded-md shadow-2xl"
    >
      <header
        class="p-4 text-2xl sm:text-3xl font-bold text-center bg-gray-100 border-b-2"
      >
        {{ title }}
      </header>
      <section class="p-4">
        <slot name="body"></slot>
      </section>
      <footer class="flex justify-around py-4 bg-gray-100 border-t-2">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LnmUmbrelModal',
  props: {
    title: {
      type: String,
      default: 'Default Title',
    },
  },

  setup(props) {
    return {}
  },
}
</script>
