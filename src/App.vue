<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">EV</span>
        <div><strong>Enterprise Vue</strong><small>Starter</small></div>
      </div>
      <nav class="nav" aria-label="Main navigation">
        <RouterLink class="nav-link" to="/">Dashboard</RouterLink>
        <RouterLink class="nav-link" to="/settings">Settings</RouterLink>
      </nav>
      <div class="sidebar-footer">Production ready</div>
    </aside>
    <main class="main-panel"><RouterView /></main>
  </div>
</template>
