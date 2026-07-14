<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import ChartCanvas from '../components/ChartCanvas.vue'

const store = useDashboardStore()

const flowStats = [
  { label: 'Admissions', value: 214, delta: '+3.9%', tone: 'good' },
  { label: 'Discharges', value: 188, delta: '-2.6%', tone: 'bad' },
  { label: 'Transfers', value: 47, delta: '+5', tone: 'good' },
  { label: 'Avg. Length of Stay', value: '4.2d', delta: '-0.3 days', tone: 'good' },
  { label: 'ER Wait Time', value: '41m', delta: '-6 min', tone: 'good' },
]

const hourlyFlow = {
  labels: ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'],
  admissions: [4, 3, 5, 6, 9, 12, 14, 16, 15, 13, 10, 7],
  discharges: [2, 1, 3, 5, 10, 14, 16, 15, 12, 9, 6, 4],
}

const censusTrend = [1120, 1138, 1142, 1149, 1163, 1178, 1184, 1192, 1201, 1210, 1218, 1248]
</script>

<template>
  <section class="view-shell">
    <div class="metrics-grid">
      <div v-for="stat in flowStats" :key="stat.label" class="card card-pad">
        <div class="kpi-label">{{ stat.label }}</div>
        <div class="kpi-value" style="font-size: 1.6rem; margin-top: 8px;">{{ stat.value }}</div>
        <div class="kpi-delta" :class="stat.tone === 'good' ? 'up-good' : 'up-bad'">{{ stat.delta }}</div>
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom: 20px;">
      <div class="section-heading">
        <h2>Admissions vs. Discharges</h2>
        <div class="chip normal">Last 24 Hours</div>
      </div>
      <ChartCanvas type="line" :labels="hourlyFlow.labels" :datasets="[{ label: 'Admissions', data: hourlyFlow.admissions, borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.16)' }, { label: 'Discharges', data: hourlyFlow.discharges, borderColor: '#0d9c94', backgroundColor: 'rgba(13, 156, 148, 0.16)' } ]" :height="260" />
    </div>

    <div class="card card-pad" style="margin-bottom: 20px;">
      <div class="section-heading">
        <h2>Patient Flow Diagram</h2>
      </div>
      <div class="flow-diagram">
        <div class="flow-node">ER Arrivals<br /><strong>312</strong></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">Triage / Eval<br /><strong>298</strong></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">Admitted<br /><strong>214</strong></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">Inpatient Units<br /><strong>214</strong></div>
      </div>
    </div>

    <div class="card card-pad">
      <div class="section-heading">
        <h2>Department Trends</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Admissions</th>
              <th>Discharges</th>
              <th>Avg LOS</th>
              <th>Transfers In</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trend in store.flowDepartmentTrends" :key="trend.id">
              <td><span class="row-dept"><span class="dept-dot" :style="{ background: trend.color }"></span>{{ trend.name }}</span></td>
              <td>{{ trend.admissions }}</td>
              <td>{{ trend.discharges }}</td>
              <td>{{ trend.avgLos }}</td>
              <td>{{ trend.transfersIn }}</td>
              <td>
                <span class="trend-chip" :class="trend.trend">{{ trend.trend }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
