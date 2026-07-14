<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

type ChartDataset = {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  fill?: boolean
}

const props = defineProps<{
  type: 'line' | 'bar' | 'area'
  labels: string[]
  datasets: ChartDataset[]
  height?: number
}>()

const chartShell = ref<HTMLElement | null>(null)
const width = ref(560)
const height = computed(() => props.height ?? 220)
const padL = 42
const padR = 24
const padT = 14
const padB = 32

function updateChartWidth() {
  if (!chartShell.value) return
  const rect = chartShell.value.getBoundingClientRect()
  width.value = Math.max(320, Math.floor(rect.width))
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  updateChartWidth()
  if (typeof ResizeObserver !== 'undefined' && chartShell.value) {
    resizeObserver = new ResizeObserver(() => updateChartWidth())
    resizeObserver.observe(chartShell.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

function scale(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
  if (fromMax === fromMin) return (toMin + toMax) / 2
  return toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin)
}

function pathFromPoints(points: Array<[number, number]>) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(' ')
}

const allValues = computed(() => props.datasets.flatMap((dataset) => dataset.data))
const minValue = computed(() => Math.min(...allValues.value) * (props.type === 'bar' ? 0.9 : 0.94))
const maxValue = computed(() => Math.max(...allValues.value) * (props.type === 'bar' ? 1.15 : 1.06))

const chartPoints = computed(() =>
  props.datasets.map((dataset) => ({
    ...dataset,
    points: dataset.data.map((value, index) => [
      scale(index, 0, dataset.data.length - 1, padL, width.value - padR),
      scale(value, minValue.value, maxValue.value, height.value - padB, padT),
    ] as [number, number]),
  })),
)

const yTicks = computed(() => Array.from({ length: 5 }, (_, index) => {
  const value = maxValue.value - ((maxValue.value - minValue.value) * index) / 4
  return Math.round(value)
}))

const areaPath = computed(() => {
  const series = chartPoints.value[0]
  const points = series.points
  if (!points.length) return ''
  return `${pathFromPoints(points)} L${points[points.length - 1][0]},${height.value - padB} L${points[0][0]},${height.value - padB} Z`
})

const barWidth = computed(() => (width.value - padL - padR) / Math.max(props.labels.length, 1) - 14)
</script>

<template>
  <div ref="chartShell" class="chart-shell" :style="{ height: `${height}px` }">
    <svg :width="width" :height="height" viewBox="0 0 560 260" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <line v-for="tick in yTicks" :key="tick" :x1="padL" :x2="width - padR" :y1="scale(tick, minValue, maxValue, height - padB, padT)" :y2="scale(tick, minValue, maxValue, height - padB, padT)" stroke="rgba(107,118,136,0.16)" stroke-width="1" />
      <line :x1="padL" :x2="padL" :y1="padT" :y2="height - padB" stroke="rgba(107,118,136,0.16)" stroke-width="1" />
      <line :x1="padL" :x2="width - padR" :y1="height - padB" :y2="height - padB" stroke="rgba(107,118,136,0.16)" stroke-width="1" />
      <text v-for="tick in yTicks" :key="`${tick}-label`" :x="padL - 10" :y="scale(tick, minValue, maxValue, height - padB, padT) + 4" text-anchor="end" font-size="10" fill="#6b7688" font-family="Inter, sans-serif">{{ tick }}</text>
      <text v-for="(label, index) in props.labels" :key="label" :x="padL + index * ((width - padL - padR) / props.labels.length)" :y="height - 8" text-anchor="middle" font-size="10" fill="#6b7688" font-family="Inter, sans-serif">{{ label }}</text>

      <defs v-if="props.type !== 'bar'">
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="props.datasets[0]?.backgroundColor || 'rgba(37,99,235,0.16)'" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path v-if="props.type === 'area'" :d="areaPath" fill="url(#chart-fill)" />

      <template v-for="series in chartPoints" :key="series.label">
        <path v-if="props.type !== 'bar'" :d="pathFromPoints(series.points)" :stroke="series.borderColor || '#2563eb'" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <circle v-for="(point, index) in series.points" :key="`${series.label}-${index}`" :cx="point[0]" :cy="point[1]" r="3" :fill="series.borderColor || '#2563eb'" />
      </template>

      <template v-if="props.type === 'bar'">
        <rect v-for="(label, index) in props.labels" :key="label" :x="padL + index * (barWidth + 10)" :y="height - padB - ((Number(props.datasets[0]?.data[index]) - minValue) / (maxValue - minValue || 1)) * (height - padB - padT)" :width="barWidth" :height="((Number(props.datasets[0]?.data[index]) - minValue) / (maxValue - minValue || 1)) * (height - padB - padT)" rx="6" fill="#2563eb" />
      </template>
    </svg>
  </div>
</template>
