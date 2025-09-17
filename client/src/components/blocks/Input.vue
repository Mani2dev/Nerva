<script setup>
const model = defineModel({ type: [String, Number], default: '' }) // Vue 3.4+

const props = defineProps({
  type: { type: String, default: 'text' },
  id: String,
  name: String,
  placeholder: String,
  autocomplete: String
})
</script>

<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    v-model="model"
    class="input"
  />
</template>

<style scoped>
.input { outline: none; border: none; width: 100%; font-size: var(--font-nm); }
</style>
