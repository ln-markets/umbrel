<template>
  <vue-final-modal
    :z-index-base="999"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col mx-4 p-4 border rounded bg-white modal-content"
  >
    <div
      class="py-2 text-3xl text-center border-b border-gray-500 font-semi-bold"
    >
      <slot name="title"></slot>
    </div>
    <div class="my-2">
      <slot name="content"></slot>
    </div>
    <div class="flex justify-evenly items-center py-2 w-full">
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
