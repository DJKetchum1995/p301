<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboard'

const store = useDashboardStore()
</script>

<template>
  <div class="drawer-backdrop" :class="{ open: store.showNotifications }" @click="store.toggleNotifications()"></div>
  <aside class="drawer" :class="{ open: store.showNotifications }">
    <div class="drawer-head">
      <h3>Notifications</h3>
      <button class="icon-btn" @click="store.toggleNotifications()">
        <v-icon>mdi-close</v-icon>
      </button>
    </div>
    <div class="drawer-body">
      <div v-for="notification in store.notifications" :key="notification.id" class="drawer-notif">
        <div class="n-icon" :style="{ background: notification.severity === 'critical' ? 'rgba(220,43,43,0.12)' : notification.severity === 'warning' ? 'rgba(232,147,11,0.15)' : 'rgba(37,99,235,0.12)', color: notification.severity === 'critical' ? '#dc2b2b' : notification.severity === 'warning' ? '#e8930b' : '#2563eb' }">
          <v-icon size="16">{{ notification.icon }}</v-icon>
        </div>
        <div class="n-body">
          <div class="n-title">{{ notification.title }}</div>
          <div class="n-desc">{{ notification.description }}</div>
          <div class="n-time">{{ notification.time }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>
