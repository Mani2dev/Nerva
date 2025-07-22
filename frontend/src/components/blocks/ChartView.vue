<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)

onMounted(async () => {
  const res = await fetch('/src/data/demo/attacks.json')
  const data = await res.json()

  const labels = data.map(d => d.hour)
  const values = data.map(d => d.count)

  const styles = getComputedStyle(document.documentElement)
  const textColor = styles.getPropertyValue('--color-text').trim()
  const accentColor = styles.getPropertyValue('--color-accent').trim()

  new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Fake Attacks (Last 24h)',
        data: values,
        backgroundColor: accentColor + '33', // transparent fill
        borderColor: accentColor,
        pointBackgroundColor: accentColor
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: textColor }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          title: { text: 'Hour', display: true, color: textColor }
        },
        y: {
          beginAtZero: true,
          ticks: { color: textColor },
          title: { text: 'Hits', display: true, color: textColor }
        }
      }
    }
  })
})
</script>




<template>
    <div class="chart--view--container">
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<style scoped>
    .chart--view--container {
        padding: 10px;
        flex: 1 1 100%;
        /* 👈 Responsive width! */
        min-width: 300px;
        /* 👈 Prevents squish */
        max-width: 100%;
        height: auto;
        aspect-ratio: 2 / 1;
        /* 👈 Controls chart shape */
        border: 1px solid var(--border-color-full);
        box-sizing: border-box;
    }

    canvas {
        width: 100% !important;
        height: 100% !important;
    }
</style>