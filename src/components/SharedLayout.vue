<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { useRoute, useRouter } from 'vue-router'
import NotificationDrawer from './NotificationDrawer.vue'

const store = useDashboardStore()
const router = useRouter()
const route = useRoute()

const navItems = [
  { label: 'Executive Overview', route: '/executive', icon: 'mdi-view-dashboard' },
  { label: 'Patient Flow', route: '/flow', icon: 'mdi-map-marker-path' },
  { label: 'Capacity', route: '/capacity', icon: 'mdi-layers' },
  { label: 'Staffing', route: '/staffing', icon: 'mdi-account-group' },
  { label: 'Reports', route: '/reports', icon: 'mdi-file-document-outline' },
]

const currentTitle = computed(() => {
  const match = navItems.find((item) => item.route === route.path)
  return match?.label ?? 'Overview'
})

function goTo(routeName: string) {
  store.setActiveView(routeName)
  router.push(routeName)
}
</script>

<template>
  <div class="shell" :class="{ 'sidebar-collapsed': store.sidebarCollapsed, 'theme-dark': store.isDark }">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">
          <v-icon color="white">mdi-heart-pulse</v-icon>
        </div>
        <div class="brand-text">
          <span class="name">CareFlow</span>
          <span class="sub">Operations</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Operations</div>
        <button
          v-for="item in navItems"
          :key="item.route"
          class="nav-item"
          :class="{ active: route.path === item.route }"
          @click="goTo(item.route)"
        >
          <v-icon size="18">{{ item.icon }}</v-icon>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="theme-toggle" @click="store.toggleTheme()">
          <span class="theme-toggle-copy">
            <v-icon size="16">mdi-weather-night</v-icon>
            <span>Dark mode</span>
          </span>
          <span class="theme-toggle-track">
            <span class="theme-toggle-thumb"></span>
          </span>
        </button>
      </div>
    </aside>

    <div class="main-column">
      <header class="topbar">
        <button class="topbar-collapse-btn" @click="store.toggleSidebar()">
          <v-icon>mdi-menu</v-icon>
        </button>
        <div class="org-select">
          <v-icon size="16">mdi-hospital</v-icon>
          <span>St. Augustine Medical Center</span>
          <v-icon size="16">mdi-chevron-down</v-icon>
        </div>
        <div class="topbar-search">
          <v-icon size="16">mdi-magnify</v-icon>
          <input type="text" placeholder="Search patients, units, staff…" />
        </div>
        <div class="topbar-spacer"></div>
        <div class="topbar-actions">
          <button class="icon-btn" @click="store.toggleNotifications()">
            <v-icon>mdi-bell</v-icon>
            <span class="dot"></span>
          </button>
          <div class="topbar-user">
            <div class="avatar">DK</div>
            <div class="topbar-user-meta">
              <span class="name">David Ketchum</span>
              <span class="role">Operations Manager</span>
            </div>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="view-header">
          <div class="view-title-group">
            <div class="eyebrow">Live · Updated 2 min ago</div>
            <h1>{{ currentTitle }}</h1>
            <p>Hospital-wide operational snapshot — census, throughput, staffing and capacity at a glance.</p>
          </div>
          <div class="view-controls">
            <div class="select">
              <v-icon size="16">mdi-calendar</v-icon>
              <select v-model="store.selectedRange">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <button class="btn btn-secondary">
              <v-icon size="16">mdi-download</v-icon>
              Export
            </button>
            <button class="btn btn-primary">
              <v-icon size="16">mdi-refresh</v-icon>
              Refresh
            </button>
          </div>
        </div>
        <router-view />
      </main>
    </div>
    <NotificationDrawer />
  </div>
</template>
