<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Settings - Maginus Web App',
  description: 'Configure application settings'
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Settings</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Profile Settings -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:user-circle" class="h-6 w-6" />
            Profile Settings
          </h2>
          <div class="space-y-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Display Name</span>
              </label>
              <input type="text" class="input input-bordered" placeholder="Your display name" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" class="input input-bordered" placeholder="your.email@company.com" readonly />
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>

      <!-- Application Settings -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:cog-6-tooth" class="h-6 w-6" />
            Application Settings
          </h2>
          <div class="space-y-4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Dark Mode</span>
                <input type="checkbox" class="toggle toggle-primary" checked />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Email Notifications</span>
                <input type="checkbox" class="toggle toggle-primary" />
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Language</span>
              </label>
              <select class="select select-bordered">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <button class="btn btn-primary">Save Settings</button>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info">
      <Icon name="heroicons:information-circle" class="h-5 w-5" />
      <span>Settings functionality will be implemented here.</span>
    </div>
  </div>
</template>