<script lang="ts" setup>
import type { Customer } from '~/types/customer'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const customerAccount = route.params.customerAccount as string

useSeoMeta({
  title: `Customer ${customerAccount} - Maginus Web App`,
  description: `Customer details for account ${customerAccount}`,
})

const { data, pending, error } = await useAuthenticatedFetch<{
  success: boolean
  customer: Customer
}>(`/api/customer/${customerAccount}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Customer not found',
  })
}

const customer = computed(() => data.value?.customer)
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Customer {{ customerAccount }}</h1>
        <p class="text-base-content/70 mt-1">{{ customer?.customerName }}</p>
      </div>
      <NuxtLink class="btn btn-ghost" to="/customers">
        <Icon class="h-5 w-5" name="heroicons:arrow-left"/>
        Back to Customers
      </NuxtLink>
    </div>

    <div v-if="pending" class="flex justify-center items-center h-64">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="customer" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Basic Information</h2>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Account</span>
                </label>
                <p class="text-lg">{{ customer.customerAccount }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Name</span>
                </label>
                <p class="text-lg">{{ customer.customerName }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Country</span>
                </label>
                <p>{{ customer.countryCode }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Currency</span>
                </label>
                <p>{{ customer.currencyCode }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Status</span>
                </label>
                <div :class="customer.status === 1 ? 'badge-success' : 'badge-warning'" class="badge">
                  {{ customer.status }}
                </div>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Account Type</span>
                </label>
                <p>{{ customer.accountType }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Financial Information</h2>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Credit Limit</span>
                </label>
                <p class="text-lg font-semibold">{{ customer.creditLimit || 'N/A' }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Payment Term</span>
                </label>
                <p>{{ customer.paymentTerm }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Unpaid Balance</span>
                </label>
                <p :class="Number(customer.unpaidBalance) > 0 ? 'text-error' : 'text-success'" class="font-semibold">
                  {{ customer.unpaidBalance || '0.00' }}
                </p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Uninvoiced Balance</span>
                </label>
                <p class="font-semibold">{{ customer.uninvoicedBalance || '0.00' }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">VAT Number</span>
                </label>
                <p>{{ customer.vatRegNum || 'N/A' }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">VAT Applicable</span>
                </label>
                <div :class="customer.vatApplicable === 1 ? 'badge-success' : 'badge-neutral'" class="badge">
                  {{ customer.vatApplicable === 1 ? 'Yes' : 'No' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Contact Information</h2>
          <div class="space-y-3">
            <div>
              <label class="label">
                <span class="label-text font-medium">Main Contact</span>
              </label>
              <p>{{ customer.mainContact || 'N/A' }}</p>
            </div>
            <div>
              <label class="label">
                <span class="label-text font-medium">Prime Address</span>
              </label>
              <p>{{ customer.primeAddressLine || 'N/A' }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Sales Office</span>
                </label>
                <p>{{ customer.salesOffice }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Rep Code</span>
                </label>
                <p>{{ customer.repCode || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">System Information</h2>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Creation Date</span>
                </label>
                <p>{{ customer.creationDate ? new Date(customer.creationDate).toLocaleDateString() : 'N/A' }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Last Used</span>
                </label>
                <p>{{ customer.lastUsed ? new Date(customer.lastUsed).toLocaleDateString() : 'N/A' }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Change User</span>
                </label>
                <p>{{ customer.changeUser || 'N/A' }}</p>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Change Date</span>
                </label>
                <p>{{ customer.changeDate ? new Date(customer.changeDate).toLocaleDateString() : 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-error">
      <Icon class="h-5 w-5" name="heroicons:exclamation-triangle"/>
      <span>Customer not found or failed to load customer data.</span>
    </div>
  </div>
</template>

<style scoped>
</style>