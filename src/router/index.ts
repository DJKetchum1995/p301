import { createRouter, createWebHistory } from 'vue-router'
import ExecutiveOverviewView from '../views/ExecutiveOverviewView.vue'
import PatientFlowView from '../views/PatientFlowView.vue'
import CapacityView from '../views/CapacityView.vue'
import StaffingView from '../views/StaffingView.vue'
import ReportsView from '../views/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/executive' },
    { path: '/executive', name: 'executive', component: ExecutiveOverviewView },
    { path: '/flow', name: 'flow', component: PatientFlowView },
    { path: '/capacity', name: 'capacity', component: CapacityView },
    { path: '/staffing', name: 'staffing', component: StaffingView },
    { path: '/reports', name: 'reports', component: ReportsView },
  ],
})

export default router
