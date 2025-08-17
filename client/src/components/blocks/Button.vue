<script setup>
defineProps({
  type: { type: String, default: 'button' },
  style: String,
  name: String,
  id: String,
  action: Function,
  value: String
});
</script>

<template>
  <button
    :type="type"
    :style="style"
    :name="name"
    :id="id"
    :value="value"
    @click="action && action($event)"
  >
    <slot />
  </button>
</template>

<style scoped>
  
</style>
