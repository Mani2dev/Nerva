<script setup>
defineProps({
  value: String,
  style: String,
  placeholder: String,
  name: String,
  id: String,
  action: Function
});

defineEmits(['update:value']);
</script>

<template>
  <textarea
    :value="value"
    :placeholder="placeholder"
    :name="name"
    :id="id"
    :class="style"
    @input="$emit('update:value', $event.target.value)"
    @click="action && action($event)"
  />
</template>

<style scoped>
/* Add default styling or leave empty */
</style>
