<script setup lang="ts">
import { computed } from 'vue'
import type { KpiMetric } from '../types'

const props = defineProps<{ metric: KpiMetric }>()

const sparkPath = computed(() => {
  if (!props.metric.trendData?.length) return ''
  const values = props.metric.trendData
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  return values
    .map((value, index) => {
      const x = index * 8 + 5
      const y = 24 - ((value - min) / range) * 16 - 4
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
})

const sparkColor = computed(() => {
  switch (props.metric.accent) {
    case 'green':
      return '#1a9d5c'
    case 'teal':
      return '#0d9c94'
    case 'amber':
      return '#e8930b'
    case 'red':
      return '#dc2b2b'
    default:
      return '#2563eb'
  }
})
</script>

<template>
  <div class="card card-pad kpi-card">
    <span class="accent-bar" :class="metric.accent"></span>
    <div class="kpi-top">
      <div>
        <div class="kpi-label">{{ metric.label }}</div>
      </div>
      <div class="kpi-icon" :class="metric.accent">
        <v-icon>{{ metric.icon }}</v-icon>
      </div>
    </div>
    <div class="kpi-value">
      {{ metric.value }}<span v-if="metric.unit" class="unit">{{ metric.unit }}</span>
    </div>
    <div class="kpi-delta" :class="metric.deltaType === 'good' ? 'up-good' : 'up-bad'">
      <v-icon size="12">{{ metric.deltaDirection === 'up' ? 'mdi-trending-up' : 'mdi-trending-down' }}</v-icon>
      {{ metric.deltaLabel }}
    </div>
    <div v-if="metric.progress !== undefined" class="progress-track" style="margin-top: 10px;">
      <div class="progress-fill" :class="metric.accent" :style="{ width: `${metric.progress}%` }"></div>
    </div>
    <div v-else-if="metric.trendData" class="kpi-foot">
      <span class="kpi-foot-label">Last 12 hours</span>
      <svg width="90" height="24" viewBox="0 0 90 24" class="sparkline">
        <path :d="sparkPath" :stroke="sparkColor" stroke-width="2" fill="none" />
      </svg>
    </div>
  </div>
</template>
