export interface DashboardDepartment {
  id: string
  name: string
  total: number
  occupied: number
  icon: string
  color: string
  status: 'critical' | 'warning' | 'normal'
  admissionsToday: number
  staffOnDuty: number
  avgLos: string
  pendingDischarges: number
}

export interface KpiMetric {
  id: string
  label: string
  value: number | string
  unit?: string
  deltaLabel: string
  deltaDirection: 'up' | 'down'
  deltaType: 'good' | 'bad'
  accent: 'blue' | 'green' | 'teal' | 'amber' | 'red'
  icon: string
  trendData?: number[]
  progress?: number
}

export interface ActivityItem {
  id: string
  title: string
  time: string
  icon: string
  color: string
}

export interface NotificationItem {
  id: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  description: string
  time: string
  icon: string
}

export interface FlowDepartmentTrend {
  id: string
  name: string
  color: string
  admissions: number
  discharges: number
  avgLos: string
  transfersIn: number
  trend: 'up' | 'down' | 'flat'
}

export interface StaffingRiskItem {
  id: string
  name: string
  status: 'critical' | 'warning' | 'normal'
  note: string
}

export interface MonthlyMetric {
  month: string
  avgCensus: number
  admissions: number
  discharges: number
  avgLos: string
  erWait: string
  occupancy: string
}
