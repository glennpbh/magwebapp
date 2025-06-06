<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { isAuthenticated } = useAuth()
</script>

<template>
  <div data-theme="dark" class="min-h-screen bg-base-100">
    <div v-if="isAuthenticated" class="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" class="drawer-toggle" />

      <!-- Page content -->
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar bg-base-300 w-full">
          <div class="flex-none lg:hidden">
            <label for="drawer-toggle" class="btn btn-square btn-ghost">
              <Icon name="heroicons:bars-3" class="h-6 w-6" />
            </label>
          </div>
          <div class="flex-1">
            <h1 class="text-xl font-bold">Maginus Web App</h1>
          </div>
          <div class="flex-none">
            <AppNavigation />
          </div>
        </div>

        <!-- Main content -->
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="drawer-toggle" class="drawer-overlay"></label>
        <aside class="min-h-full w-64 bg-base-200">
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Menu</h2>
            <AppSidebar />
          </div>
        </aside>
      </div>
    </div>

    <!-- Content for non-authenticated users -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style>
html {
  font-family: system-ui, sans-serif;
}
</style>
