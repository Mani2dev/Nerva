<script setup>
const props = defineProps({
  type: String,
  title: String,
  name: String,
  placeholder: String,
  action: Function,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue']) // Allow emitting

</script>

<template>
  <input
    :type="type"
    :title="title"
    :name="name"
    :placeholder="placeholder"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)" 
    @click="action"
  />
</template>

<style scoped>
input {
  position: relative;
  border-radius: 6px;
  border: solid 2px transparent;
  width: 100%;
  transition: .3s ease;
  padding: 15px 10px;
  background: var(--color-input-bg);
  font-size: var(--font-md);
}
input:focus {
  border: solid 2px var(--border-color);
}
</style>
