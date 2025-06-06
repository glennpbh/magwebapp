<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Customers - Maginus Web App',
  description: 'Manage customer accounts and information'
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Customers</h1>
      <button class="btn btn-primary">
        <Icon name="heroicons:plus" class="h-5 w-5" />
        Add Customer
      </button>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Customer Management</h2>
        <p class="text-base-content/70">
          Search and manage customer accounts, view customer details, and perform customer-related operations.
        </p>
        
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Search customers</span>
          </label>
          <input type="text" placeholder="Enter customer account or name" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="alert alert-info mt-4">
          <Icon name="heroicons:information-circle" class="h-5 w-5" />
          <span>Customer management features will be implemented here.</span>
        </div>
      </div>
    </div>
  </div>
</template>