<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import ChartCanvas from '../components/ChartCanvas.vue'

const store = useDashboardStore()

const filteredDepartments = computed(() => {
  if (store.selectedCapacityStatus === 'All Statuses') return store.departments
  return store.departments.filter((department) => department.status === store.selectedCapacityStatus.toLowerCase())
})

const heatmapRows = [
  { name: 'ICU', values: [92, 94, 96, 97, 98, 96, 93, 90] },
  { name: 'Emergency', values: [70, 78, 85, 89, 87, 82, 75, 68] },
  { name: 'Med Surg', values: [85, 87, 89, 91, 91, 90, 88, 86] },
  { name: 'Pediatrics', values: [60, 64, 70, 73, 72, 69, 63, 58] },
  { name: 'Maternity', values: [55, 58, 63, 68, 66, 62, 57, 53] },
]

function heatColor(value: number) {
  if (value >= 93) return '#c62525'
  if (value >= 85) return '#dc2b2b'
  if (value >= 75) return '#e8930b'
  if (value >= 65) return '#ecb03f'
  if (value >= 55) return '#4fae76'
  return '#1a9d5c'
}
</script>

<template>
  <section class="view-shell">
    <div class="section-heading">
      <h2>Department Capacity</h2>
      <div class="select">
        <v-icon size="16">mdi-filter</v-icon>
        <select v-model="store.selectedCapacityStatus">
          <option>All Statuses</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Normal</option>
        </select>
      </div>
    </div>

    <div class="metrics-grid">
      <div v-for="department in filteredDepartments" :key="department.id" class="card card-pad department-card">
        <div class="dept-card-head">
          <span class="dept-name">
            <span class="dept-icon" :style="{ background: `${department.color}1A`, color: department.color }">
              <v-icon size="16">{{ department.icon }}</v-icon>
            </span>
            {{ department.name }}
          </span>
          <span class="chip" :class="department.status">{{ department.status }}</span>
        </div>
        <div class="dept-occ-row">
          <span class="dept-occ-value">{{ Math.round((department.occupied / department.total) * 100) }}%</span>
          <span class="dept-occ-sub">{{ department.occupied }}/{{ department.total }} beds</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :class="department.status" :style="{ width: `${Math.round((department.occupied / department.total) * 100)}%` }"></div>
        </div>
        <div class="dept-detail-grid">
          <div>
            <div class="label">Staff on Duty</div>
            <div class="value">{{ department.staffOnDuty }}</div>
          </div>
          <div>
            <div class="label">Admissions Today</div>
            <div class="value">{{ department.admissionsToday }}</div>
          </div>
          <div>
            <div class="label">Avg LOS</div>
            <div class="value">{{ department.avgLos }}</div>
          </div>
          <div>
            <div class="label">Pending Discharges</div>
            <div class="value">{{ department.pendingDischarges }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom: 20px;">
      <div class="section-heading">
        <h2>Capacity Heat Map</h2>
      </div>
      <div class="heatmap-grid">
        <div class="heatmap-row heatmap-header">
          <div></div>
          <div v-for="label in ['6a', '9a', '12p', '3p', '6p', '9p', '12a', '3a']" :key="label">{{ label }}</div>
        </div>
        <div v-for="row in heatmapRows" :key="row.name" class="heatmap-row">
          <div class="heatmap-label">{{ row.name }}</div>
          <div v-for="value in row.values" :key="`${row.name}-${value}`" class="heatmap-cell" :style="{ background: heatColor(value) }">{{ value }}%</div>
        </div>
      </div>
    </div>

    <div class="card card-pad">
      <div class="section-heading">
        <h2>Bed Availability</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Beds</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Occupancy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in filteredDepartments" :key="department.id">
              <td><span class="row-dept"><span class="dept-dot" :style="{ background: department.color }"></span>{{ department.name }}</span></td>
              <td>{{ department.total }}</td>
              <td>{{ department.occupied }}</td>
              <td>{{ department.total - department.occupied }}</td>
              <td>{{ Math.round((department.occupied / department.total) * 100) }}%</td>
              <td><span class="chip" :class="department.status">{{ department.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
