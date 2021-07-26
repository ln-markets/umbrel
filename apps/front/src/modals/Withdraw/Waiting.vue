<template>
  <modal :title="title">
    <template #body>
      <div class="spinner" />
    </template>
    <template #footer>
      <p class="text-gray-100">You found an easter egg!</p>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  setup() {
    return {}
  },
}
</script>

<style lang="postcss" scoped>
.spinner {
  @apply w-8 h-8 mx-auto;

  border-radius: 100%;
  border: 4px solid rgba(0, 0, 255, 0.2);
  border-top-color: #288aef;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
