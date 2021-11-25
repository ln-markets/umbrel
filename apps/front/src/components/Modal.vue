<template>
  <vue-final-modal
    :z-index-base="999"
    classes="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center bg-black bg-opacity-40"
    content-class="flex overflow-x-auto flex-col w-5/6 lg:w-2/3 bg-white rounded-md shadow-2xl"
  >
    <div
      class="p-4 text-2xl sm:text-3xl font-bold text-center bg-gray-100 border-b-2"
    >
      <slot name="title"></slot>
    </div>
    <div class="p-4">
      <slot name="content"></slot>
    </div>
    <div class="flex justify-around py-4 bg-gray-100 border-t-2">
      <slot name="footer"></slot>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'CustomModal',
  inheritAttrs: true,
}
</script>

<style scoped>
::v-deep(.modal-content) {
  min-width: 600px;
}
</style>
