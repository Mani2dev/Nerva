<script setup>
defineProps({
  value: String,
  type: { type: String, default: 'text' },
  style: String,
  placeholder: String,
  name: String,
  id: String,
  action: Function
});

defineEmits(['update:value']);
</script>

<template>
  <input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :style="style"
    :name="name"
    :id="id"
    :class="style"
    @input="$emit('update:value', $event.target.value)"
    @click="action && action($event)"
  />
</template>

<style scoped>

    input {
        outline: none;
        border: none;
        width: 100%;
        font-size: var(--font-nm);
    }

</style>
