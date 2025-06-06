<script setup lang="ts">
import type { SalesHeader } from '~/types/sales-header'

const route = useRoute()
const salesDocumentNum = route.params.salesDocumentNum as string

const order = ref<SalesHeader | null>(null)
const isLoading = ref(true)
const err = ref<string | null>(null)

const fetchOrder = async () => {
  isLoading.value = true
  err.value = null

  try {
    const response = await $fetch<{
      success: boolean
      data: SalesHeader
    }>(`/api/sales-header/${salesDocumentNum}`)

    if (response.success) {
      order.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch order:', error)
    err.value = error instanceof Error ? error.message : 'Failed to load order'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchOrder()
})

const getStatusBadgeClass = (status?: number) => {
  const classes = {
    0: 'badge-warning', // Incomplete
    1: 'badge-info', // Held
    2: 'badge-success', // Complete
    3: 'badge-error', // Cancelled
    4: 'badge-neutral' // Provisional
  }
  return classes[status as keyof typeof classes] || 'badge-neutral'
}

const getStatusLabel = (status?: number) => {
  const labels = {
    0: 'Incomplete',
    1: 'Held',
    2: 'Complete',
    3: 'Cancelled',
    4: 'Provisional'
  }
  return labels[status as keyof typeof labels] || 'Unknown'
}

const getOrderTypeLabel = (orderType?: number) => {
  const types = {
    0: 'Order',
    1: 'Quote',
    3: 'Works Order',
    4: 'Transfer',
    5: 'Call Off'
  }
  return types[orderType as keyof typeof types] || 'Unknown'
}

const formatCurrency = (amount?: number) => {
  if (!amount) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateNum?: number) => {
  if (!dateNum) return 'N/A'
  // Convert from YYYYMMDD format to Date
  const dateStr = dateNum.toString()
  if (dateStr.length !== 8) return 'N/A'

  const year = parseInt(dateStr.substring(0, 4))
  const month = parseInt(dateStr.substring(4, 6)) - 1 // Month is 0-indexed
  const day = parseInt(dateStr.substring(6, 8))

  const date = new Date(year, month, day)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/orders" class="btn btn-ghost btn-circle">
          <Icon name="heroicons:arrow-left" class="h-5 w-5" />
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold">Order Details</h1>
          <p class="text-base-content/70">Sales Document #{{ salesDocumentNum }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg" />
        <p class="mt-4 text-base-content/70">Loading order details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="err" class="alert alert-error">
      <Icon name="heroicons:exclamation-triangle" class="h-5 w-5" />
      <span>{{ err }}</span>
    </div>

    <!-- Order Details -->
    <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:document-text" class="h-5 w-5" />
            Basic Information
          </h2>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Document Number</span>
                </label>
                <span class="font-mono text-lg">{{ order.salesDocumentNum }}</span>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Order Type</span>
                </label>
                <span>{{ getOrderTypeLabel(order.orderType) }}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Status</span>
                </label>
                <div class="badge" :class="getStatusBadgeClass(order.status)">
                  {{ getStatusLabel(order.status) }}
                </div>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Order Date</span>
                </label>
                <span>{{ formatDate(order.orderDate) }}</span>
              </div>
            </div>

            <div v-if="order.reference">
              <label class="label">
                <span class="label-text font-medium">Reference</span>
              </label>
              <span>{{ order.reference }}</span>
            </div>

            <div v-if="order.username">
              <label class="label">
                <span class="label-text font-medium">Created By</span>
              </label>
              <span>{{ order.username }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:user" class="h-5 w-5" />
            Customer Information
          </h2>

          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text font-medium">Customer Name</span>
              </label>
              <span class="text-lg">{{ order.customerName || 'Unknown Customer' }}</span>
            </div>

            <div v-if="order.customerAccount">
              <label class="label">
                <span class="label-text font-medium">Customer Account</span>
              </label>
              <span class="font-mono">{{ order.customerAccount }}</span>
            </div>

            <div v-if="order.contactName">
              <label class="label">
                <span class="label-text font-medium">Contact</span>
              </label>
              <div class="space-y-1">
                <div>{{ order.contactName }}</div>
                <div v-if="order.jobTitle" class="text-sm text-base-content/70">
                  {{ order.jobTitle }}
                </div>
                <div v-if="order.department" class="text-sm text-base-content/70">
                  {{ order.department }}
                </div>
              </div>
            </div>

            <div v-if="order.telephone || order.email">
              <label class="label">
                <span class="label-text font-medium">Contact Information</span>
              </label>
              <div class="space-y-1">
                <div v-if="order.telephone" class="flex items-center gap-2">
                  <Icon name="heroicons:phone" class="h-4 w-4" />
                  {{ order.telephone }}
                  <span v-if="order.extension">ext. {{ order.extension }}</span>
                </div>
                <div v-if="order.email" class="flex items-center gap-2">
                  <Icon name="heroicons:envelope" class="h-4 w-4" />
                  {{ order.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:banknotes" class="h-5 w-5" />
            Financial Information
          </h2>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Order Value</span>
                </label>
                <span class="text-2xl font-bold text-success">
                  {{ formatCurrency(order.orderValue) }}
                </span>
              </div>
              <div>
                <label class="label">
                  <span class="label-text font-medium">Currency</span>
                </label>
                <span>{{ order.currencyCode || 'USD' }}</span>
              </div>
            </div>

            <div v-if="order.vatValue" class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text font-medium">VAT Value</span>
                </label>
                <span>{{ formatCurrency(order.vatValue) }}</span>
              </div>
              <div v-if="order.orderCost">
                <label class="label">
                  <span class="label-text font-medium">Order Cost</span>
                </label>
                <span>{{ formatCurrency(order.orderCost) }}</span>
              </div>
            </div>

            <div v-if="order.paymentTerm">
              <label class="label">
                <span class="label-text font-medium">Payment Terms</span>
              </label>
              <span>{{ order.paymentTerm }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery Information -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">
            <Icon name="heroicons:truck" class="h-5 w-5" />
            Delivery Information
          </h2>

          <div class="space-y-4">
            <div v-if="order.address1 || order.address2 || order.address3">
              <label class="label">
                <span class="label-text font-medium">Delivery Address</span>
              </label>
              <div class="space-y-1">
                <div v-if="order.address1">{{ order.address1 }}</div>
                <div v-if="order.address2">{{ order.address2 }}</div>
                <div v-if="order.address3">{{ order.address3 }}</div>
                <div v-if="order.address4">{{ order.address4 }}</div>
                <div v-if="order.address5">{{ order.address5 }}</div>
                <div v-if="order.address6">{{ order.address6 }}</div>
                <div v-if="order.postcode || order.countryCode">
                  {{ order.postcode }} {{ order.countryCode }}
                </div>
              </div>
            </div>

            <div v-if="order.deliveryName">
              <label class="label">
                <span class="label-text font-medium">Delivery Name</span>
              </label>
              <span>{{ order.deliveryName }}</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div v-if="order.totalDelivery !== undefined">
                <label class="label">
                  <span class="label-text font-medium">Delivery Type</span>
                </label>
                <span>
                  {{ order.totalDelivery === 1 ? 'Total Delivery Only' : 'Part Shipment Allowed' }}
                </span>
              </div>
              <div v-if="order.completionDate">
                <label class="label">
                  <span class="label-text font-medium">Completion Date</span>
                </label>
                <span>{{ formatDate(order.completionDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
