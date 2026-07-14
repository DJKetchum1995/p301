<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler)

const props = defineProps<{
  type: 'line' | 'bar'
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
    fill?: boolean
    tension?: number
  }>
  height?: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

function buildChart() {
  if (!canvasRef.value) return
  chart?.destroy()
  chart = new Chart(canvasRef.value, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: props.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor || '#2563eb',
        backgroundColor: dataset.backgroundColor || 'rgba(37, 99, 235, 0.16)',
        fill: dataset.fill ?? false,
        tension: dataset.tension ?? 0.35,
        borderWidth: 2.5,
        pointRadius: 3,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: props.datasets.length > 1,
          labels: {
            usePointStyle: true,
            color: '#6b7688',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#6b7688',
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            color: '#6b7688',
          },
          grid: {
            color: 'rgba(107, 118, 136, 0.16)',
          },
        },
      },
    } as any,
  })
}

onMounted(buildChart)
watch(() => [props.labels, props.datasets, props.type], buildChart, { deep: true })
onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div class="chart-shell" :style="{ height: `${height ?? 220}px` }">
    <canvas ref="canvasRef" />
  </div>
</template>
