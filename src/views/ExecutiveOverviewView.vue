<script setup lang="ts">
import { computed } from 'vue'
import KpiCard from '../components/KpiCard.vue'
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()

const visibleDepartments = computed(() => store.departments.filter((department) => department.status !== 'normal'))

const alertCount = computed(() => store.departments.filter((department) => department.status === 'critical').length)
</script>

<template>
  <section class="view-shell">
    <div class="kpi-grid">
      <KpiCard v-for="metric in store.executiveKpis" :key="metric.id" :metric="metric" />
    </div>

    <div class="dashboard-grid">
      <div class="card card-pad">
        <div class="section-heading">
          <h2>Capacity by Department</h2>
          <div class="chip warning"><span class="dot"></span>{{ visibleDepartments.length }} depts at risk</div>
        </div>
        <div v-for="department in store.departments" :key="department.id" class="department-row">
          <div class="department-label">
            <span class="dept-dot" :style="{ background: department.color }"></span>
            {{ department.name }}
          </div>
          <div class="department-meta">{{ Math.round((department.occupied / department.total) * 100) }}% ({{ department.occupied }}/{{ department.total }})</div>
          <div class="progress-track">
            <div class="progress-fill" :class="department.status" :style="{ width: `${Math.round((department.occupied / department.total) * 100)}%` }"></div>
          </div>
        </div>
      </div>
      <div class="card card-pad">
        <div class="section-heading">
          <h2>Recent Activity</h2>
        </div>
        <div class="activity-feed">
          <div v-for="activity in store.activities" :key="activity.id" class="activity-item">
            <div class="activity-dot" :style="{ background: `${activity.color}1A`, color: activity.color }">
              <v-icon size="16">{{ activity.icon }}</v-icon>
            </div>
            <div class="activity-text">
              <div class="headline">{{ activity.title }}</div>
              <div class="meta">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
