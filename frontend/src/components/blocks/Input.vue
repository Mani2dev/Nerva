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
  background: var(--color-input-bg);
  border-radius: 0px;
  border: solid .1px var(--border-color);
  width: 100%;
  transition: .3s ease;
  padding: 10px 10px;
}

input::placeholder {
  opacity: 60%;
}
</style>
