<script setup>
defineProps({
  log: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="log--line">
    <span class="timestamp">[{{ new Date(log.timestamp).toLocaleTimeString() }}]</span>
    <span class="trap">{{ log.trap }}</span>:
    <span class="ip">{{ log.ip }}</span> →
    <span class="action">{{ log.action }}</span>
  </div>
</template>

<style scoped>
.log--line {
  font-family: monospace;
  color: #ff009d;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: solid 1px var(--border-color);
  line-height: 1.4;
}
.timestamp {
  color: #888;
  margin-right: 0.5em;
}
.trap {
  font-weight: bold;
  color: rgb(0, 110, 255);
}
.ip {
  color: #f66;
  margin: 0 0.3em;
}
.action {
  color: var(--color-text);
}
</style>
