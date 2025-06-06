<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Reports - Maginus Web App',
  description: 'Generate and view business reports'
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Reports</h1>
      <button class="btn btn-primary">
        <Icon name="heroicons:document-plus" class="h-5 w-5" />
        Generate Report
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Sales Reports</h3>
          <p class="text-base-content/70">View sales performance and trends</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">Generate</button>
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Customer Reports</h3>
          <p class="text-base-content/70">Analyze customer data and behavior</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">Generate</button>
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Financial Reports</h3>
          <p class="text-base-content/70">Review financial performance</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">Generate</button>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info">
      <Icon name="heroicons:information-circle" class="h-5 w-5" />
      <span>Report generation features will be implemented here.</span>
    </div>
  </div>
</template>