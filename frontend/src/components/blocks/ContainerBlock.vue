<script setup>
  import { ref } from 'vue'

  const isOpen = ref(false)
</script>

<template>
  <div class="docker--box">
    <div class="docker--box--header" @click="isOpen = !isOpen">
      <h3>Cowrie</h3>
      <i class="hgi hgi-stroke hgi-sharp hgi-arrow-down-01"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s ease' }"></i>
    </div>

    <transition name="fade-expand">
      <div v-show="isOpen" class="docker--box--info">
        <div class="info--grid">
          <div><strong>Status:</strong> <span class="status up">Running</span></div>
          <div><strong>Container IP:</strong> <span>172.17.0.2</span></div>
          <div><strong>Container ID:</strong> <code>e8f2a91d3abc</code></div>
          <div><strong>Uptime:</strong> <span>3h 42m</span></div>
          <div><strong>Port Mapping:</strong> <span>2222 → 22</span></div>
          <div><strong>Last Restart:</strong> <span>12:15 PM - Jul 21</span></div>
        </div>

        <div class="info--actions">
          <div class="info--logs">
            <strong>Logs:</strong>
            <button class="docker--btn">View</button>
            <button class="docker--btn">Download</button>
          </div>

          <div class="info--controls">
            <button class="docker--btn danger">Terminate</button>
            <button class="docker--btn">Restart</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .docker--box {
    padding: 10px;
    width: 60%;
    border: solid 1px var(--border-color);
    transition: 0.3s ease;
  }

  .docker--box--header {
    cursor: pointer;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .docker--box--header i {
    font-size: var(--font-md);
    transition: transform 0.3s ease;
  }

  .fade-expand-enter-active,
  .fade-expand-leave-active {
    transition: all 0.3s ease;
  }

  .fade-expand-enter-from,
  .fade-expand-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  .fade-expand-enter-to,
  .fade-expand-leave-from {
    opacity: 1;
    max-height: 999px;
  }

  .docker--box--info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info--grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 10px 20px;
    font-size: var(--font-sm);
    color: var(--color-text);
  }

  .info--actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .info--logs,
  .info--controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .docker--btn {
    background: var(--color-accent);
    color: var(--color-white);
    padding: 6px 14px;
    font-size: var(--font-sm);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .docker--btn:hover {
    background: #0284c7;
  }

  .docker--btn.danger {
    background: var(--color-danger);
  }

  .docker--btn.danger:hover {
    background: #dc2626;
  }

  .status.up {
    color: #22c55e;
    font-weight: bold;
  }

  .status.down {
    color: #ef4444;
    font-weight: bold;
  }
</style>