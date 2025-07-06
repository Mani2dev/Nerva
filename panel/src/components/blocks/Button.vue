<script setup>
    defineProps({
        type: String,
        action: Function,
        value: String
    })
</script>

<template>
  <button :type="type" :action="action">
    {{value}}
  </button>
</template>

<style scoped>
    button {
      position: relative;
      padding: 15px 10px;
      border-radius: 6px;
      background: var(--color-button-bg);
      cursor: pointer;
    }
</style>