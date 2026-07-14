<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboard'
import ChartCanvas from '../components/ChartCanvas.vue'

const store = useDashboardStore()
const occupancyTrend = [84, 85, 87, 89, 91, 93, 90, 88, 86, 89, 90, 92]
const reportMonths = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
</script>

<template>
  <section class="view-shell">
    <div class="card card-pad" style="margin-bottom: 20px;">
      <div class="section-heading">
        <h2>Occupancy Trend — 12 Months</h2>
      </div>
      <ChartCanvas type="area" :labels="reportMonths" :datasets="[{ label: 'Occupancy %', data: occupancyTrend, borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.16)' }]" :height="260" />
    </div>

    <div class="card card-pad" style="margin-bottom: 20px;">
      <div class="section-heading">
        <h2>Quality Measures</h2>
      </div>
      <div class="kpi-grid">
        <div v-for="item in [{ label: '30-Day Readmission Rate', value: '8.4%', tone: 'normal' }, { label: 'Patient Satisfaction', value: '4.6/5', tone: 'normal' }, { label: 'HAI Rate', value: '0.8/1000 pd', tone: 'warning' }, { label: 'Mortality Index', value: '0.92', tone: 'normal' } ]" :key="item.label" class="card card-pad">
          <div class="kpi-label">{{ item.label }}</div>
          <div class="kpi-value" style="font-size: 1.6rem; margin-top: 8px;">{{ item.value }}</div>
          <div class="chip" :class="item.tone">{{ item.tone }}</div>
        </div>
      </div>
    </div>

    <div class="card card-pad">
      <div class="section-heading">
        <h2>Monthly Metrics</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Avg Census</th>
              <th>Admissions</th>
              <th>Discharges</th>
              <th>Avg LOS</th>
              <th>ER Wait</th>
              <th>Occupancy</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="metric in store.monthlyMetrics" :key="metric.month">
              <td>{{ metric.month }}</td>
              <td>{{ metric.avgCensus }}</td>
              <td>{{ metric.admissions }}</td>
              <td>{{ metric.discharges }}</td>
              <td>{{ metric.avgLos }}</td>
              <td>{{ metric.erWait }}</td>
              <td>{{ metric.occupancy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
