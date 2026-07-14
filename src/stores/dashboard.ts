import { defineStore } from 'pinia'
import { ref } from 'vue'
import { activities, departments, executiveKpis, flowDepartmentTrends, monthlyMetrics, notifications, staffingRisk } from '../data/mockData'

export const useDashboardStore = defineStore('dashboard', () => {
  const isDark = ref(false)
  const sidebarCollapsed = ref(false)
  const activeView = ref('executive')
  const loading = ref(false)
  const showNotifications = ref(false)
  const selectedDepartment = ref('All Departments')
  const selectedRange = ref('Today')
  const selectedShift = ref('Day')
  const selectedCapacityStatus = ref('All Statuses')

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setActiveView(view: string) {
    activeView.value = view
    loading.value = true
    window.setTimeout(() => {
      loading.value = false
    }, 450)
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleNotifications() {
    showNotifications.value = !showNotifications.value
  }

  return {
    isDark,
    sidebarCollapsed,
    activeView,
    loading,
    showNotifications,
    selectedDepartment,
    selectedRange,
    selectedShift,
    selectedCapacityStatus,
    departments,
    executiveKpis,
    activities,
    notifications,
    flowDepartmentTrends,
    staffingRisk,
    monthlyMetrics,
    toggleTheme,
    setActiveView,
    toggleSidebar,
    toggleNotifications,
  }
})
