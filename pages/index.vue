<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

useSeoMeta({
  title: 'Dashboard - Maginus Web App',
  description: 'Welcome to your Maginus dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="hero bg-base-200 rounded-lg">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold">Welcome back!</h1>
          <p class="py-6 text-base-content/70">
            Hello {{ user?.displayName || user?.email }}, you're successfully logged in to the
            Maginus Web Application.
          </p>
        </div>
      </div>
    </div>

    <!-- User Info Card -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          <Icon name="heroicons:user-circle" class="h-6 w-6" />
          User Information
        </h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="font-medium">Email:</span>
            <span>{{ user?.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Display Name:</span>
            <span>{{ user?.displayName }}</span>
          </div>
          <div>
            <span class="font-medium">Groups:</span>
            <div class="flex flex-wrap gap-2 mt-2">
              <div v-for="group in user?.groups" :key="group" class="badge badge-primary">
                {{ group }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">
            <Icon name="heroicons:users" class="h-6 w-6" />
            Customers
          </h3>
          <p class="text-base-content/70">Manage customer accounts and information</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/customers" class="btn btn-primary btn-sm">View Customers</NuxtLink>
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">
            <Icon name="heroicons:chart-bar" class="h-6 w-6" />
            Reports
          </h3>
          <p class="text-base-content/70">Generate and view business reports</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/reports" class="btn btn-primary btn-sm">View Reports</NuxtLink>
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">
            <Icon name="heroicons:cog-6-tooth" class="h-6 w-6" />
            Settings
          </h3>
          <p class="text-base-content/70">Configure application settings</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/settings" class="btn btn-primary btn-sm">Open Settings</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          <Icon name="heroicons:signal" class="h-6 w-6" />
          System Status
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="stat">
            <div class="stat-figure text-success">
              <Icon name="heroicons:check-circle" class="h-8 w-8" />
            </div>
            <div class="stat-title">Database</div>
            <div class="stat-value text-success">Online</div>
            <div class="stat-desc">Oracle 12c connected</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-success">
              <Icon name="heroicons:check-circle" class="h-8 w-8" />
            </div>
            <div class="stat-title">Authentication</div>
            <div class="stat-value text-success">Active</div>
            <div class="stat-desc">LDAP authentication working</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-success">
              <Icon name="heroicons:check-circle" class="h-8 w-8" />
            </div>
            <div class="stat-title">API</div>
            <div class="stat-value text-success">Healthy</div>
            <div class="stat-desc">All endpoints responding</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
