<script setup>
const props = defineProps({
  action: Function,
  modelValue: String,
  value: String
})

const emit = defineEmits(['update:modelValue']) // Allow emitting

</script>

<template>
  <button
    @input="emit('update:modelValue', $event.target.value)" 
    @click="action"
  >{{value}}</button>
</template>

<style scoped>
button {
  position: relative;
  border-radius: 22px;
  width: 100%;
  transition: .3s ease;
  padding: 10px 10px;
  outline: none;
}
</style>
