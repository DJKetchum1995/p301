<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import ChartCanvas from '../components/ChartCanvas.vue'

const store = useDashboardStore()

const staffingStats = [
  { label: 'Overall Coverage', value: '96%', tone: 'normal' },
  { label: 'Staff On Duty', value: '642', tone: 'info' },
  { label: 'Open Positions', value: '10', tone: 'warning' },
  { label: 'Agency Staff Active', value: '18', tone: 'normal' },
]

const shiftTabs = ['Day', 'Evening', 'Night']
const coverageTrend = [94, 95, 93, 96, 97, 95, 96]

const shiftRows = computed(() => ({
  Day: [
    { dept: 'ICU', required: 18, scheduled: 18, actual: 17 },
    { dept: 'Emergency', required: 22, scheduled: 22, actual: 21 },
    { dept: 'Medical Surgical', required: 34, scheduled: 33, actual: 32 },
  ],
  Evening: [
    { dept: 'ICU', required: 16, scheduled: 15, actual: 14 },
    { dept: 'Emergency', required: 20, scheduled: 19, actual: 18 },
    { dept: 'Medical Surgical', required: 30, scheduled: 28, actual: 26 },
  ],
  Night: [
    { dept: 'ICU', required: 14, scheduled: 12, actual: 11 },
    { dept: 'Emergency', required: 16, scheduled: 14, actual: 13 },
    { dept: 'Medical Surgical', required: 24, scheduled: 20, actual: 19 },
  ],
}))
</script>

<template>
  <section class="view-shell">
    <div class="kpi-grid">
      <div v-for="stat in staffingStats" :key="stat.label" class="card card-pad">
        <div class="kpi-label">{{ stat.label }}</div>
        <div class="kpi-value" style="font-size: 1.6rem; margin-top: 8px;">{{ stat.value }}</div>
        <div class="chip" :class="stat.tone">{{ stat.tone === 'warning' ? 'needs attention' : 'stable' }}</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card card-pad">
        <div class="section-heading">
          <h2>Coverage Trend</h2>
        </div>
        <ChartCanvas type="bar" :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :datasets="[{ label: 'Coverage %', data: coverageTrend, borderColor: '#2563eb', backgroundColor: '#2563eb' }]" :height="220" />
      </div>
      <div class="card card-pad">
        <div class="section-heading">
          <h2>Staffing Risk</h2>
        </div>
        <div class="risk-list">
          <div v-for="risk in store.staffingRisk" :key="risk.id" class="risk-item">
            <div>
              <div class="headline">{{ risk.name }}</div>
              <div class="meta">{{ risk.note }}</div>
            </div>
            <span class="chip" :class="risk.status">{{ risk.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-pad" style="margin-top: 20px;">
      <div class="section-heading">
        <h2>Shift Staffing Detail</h2>
        <div class="tabbar">
          <button v-for="tab in shiftTabs" :key="tab" class="tab-btn" :class="{ active: store.selectedShift === tab }" @click="store.selectedShift = tab">{{ tab }}</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Required</th>
              <th>Scheduled</th>
              <th>Actual</th>
              <th>Coverage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in shiftRows[store.selectedShift as keyof typeof shiftRows]" :key="row.dept">
              <td>{{ row.dept }}</td>
              <td>{{ row.required }}</td>
              <td>{{ row.scheduled }}</td>
              <td>{{ row.actual }}</td>
              <td>{{ Math.round((row.actual / row.required) * 100) }}%</td>
              <td><span class="chip" :class="Math.round((row.actual / row.required) * 100) < 95 ? 'warning' : 'normal'">{{ Math.round((row.actual / row.required) * 100) < 95 ? 'watch' : 'stable' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
