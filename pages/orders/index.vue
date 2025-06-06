<script setup lang="ts">
interface Order {
  id: string
  customerName: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  items: number
}

const searchQuery = ref('')
const selectedStatus = ref('')
const sortBy = ref('orderDate')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Mock orders data - in a real app this would come from an API
const allOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    amount: 299.99,
    status: 'delivered',
    orderDate: '2024-01-15',
    items: 3
  },
  {
    id: 'ORD-002', 
    customerName: 'Sarah Johnson',
    amount: 156.50,
    status: 'shipped',
    orderDate: '2024-01-14',
    items: 2
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Wilson',
    amount: 89.99,
    status: 'processing',
    orderDate: '2024-01-13',
    items: 1
  },
  {
    id: 'ORD-004',
    customerName: 'Emily Davis',
    amount: 445.75,
    status: 'pending',
    orderDate: '2024-01-12',
    items: 5
  },
  {
    id: 'ORD-005',
    customerName: 'David Brown',
    amount: 123.25,
    status: 'cancelled',
    orderDate: '2024-01-11',
    items: 2
  }
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
]

const filteredOrders = computed(() => {
  let filtered = allOrders

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Sort orders
  filtered.sort((a, b) => {
    let aValue: unknown = a[sortBy.value as keyof Order]
    let bValue: unknown = b[sortBy.value as keyof Order]

    if (sortBy.value === 'orderDate') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const getStatusBadgeClass = (status: string) => {
  const classes = {
    pending: 'badge-warning',
    processing: 'badge-info',
    shipped: 'badge-primary', 
    delivered: 'badge-success',
    cancelled: 'badge-error'
  }
  return classes[status as keyof typeof classes] || 'badge-neutral'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Orders</h1>
      <div class="text-sm text-base-content/70">
        {{ ordersData.pagination.total }} orders found
      </div>
    </div>

    <!-- Search and Filter Controls -->
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search Orders</span>
            </label>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search by order ID or customer name..."
              class="input input-bordered w-full"
            >
          </div>

          <!-- Status Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Filter by Status</span>
            </label>
            <select v-model="selectedStatus" class="select select-bordered w-full">
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Sort Options -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort by</span>
            </label>
            <div class="flex gap-2">
              <select v-model="sortBy" class="select select-bordered flex-1">
                <option value="orderDate">Order Date</option>
                <option value="customerName">Customer</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
              </select>
              <button 
                class="btn btn-outline btn-square"
                :title="sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'"
                @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              >
                <Icon 
                  :name="sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" 
                  class="h-4 w-4" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="7" class="text-center py-8">
                  <span class="loading loading-spinner loading-md" />
                  Loading orders...
                </td>
              </tr>
              <tr v-else-if="filteredOrders.length === 0">
                <td colspan="7" class="text-center py-8 text-base-content/50">
                  No orders found matching your criteria
                </td>
              </tr>
              <tr v-for="order in filteredOrders" v-else :key="order.salesDocumentNum">
                <td>
                  <div class="flex flex-col">
                    <span class="font-mono font-medium">{{ order.salesDocumentNum }}</span>
                    <span class="text-xs text-base-content/50">{{ getOrderTypeLabel(order.orderType) }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-8">
                        <span class="text-xs">{{ 
                          order.customerName 
                            ? order.customerName.split(' ').map(n => n[0]).join('').substring(0, 2) 
                            : '??' 
                        }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-medium">{{ order.customerName || 'Unknown Customer' }}</div>
                      <div class="text-xs text-base-content/50">{{ order.customerAccount }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-1">
                    <Icon name="heroicons:shopping-bag" class="h-4 w-4 text-base-content/50" />
                    <span class="text-sm">{{ order.reference || 'N/A' }}</span>
                  </div>
                </td>
                <td>
                  <span class="font-semibold">{{ formatCurrency(order.orderValue) }}</span>
                  <div class="text-xs text-base-content/50">{{ order.currencyCode || 'USD' }}</div>
                </td>
                <td>
                  <div class="badge badge-sm" :class="getStatusBadgeClass(order.status)">
                    {{ getStatusLabel(order.status) }}
                  </div>
                </td>
                <td>
                  <span class="text-sm">{{ formatDate(order.orderDate) }}</span>
                </td>
                <td>
                  <div class="flex gap-1">
                    <NuxtLink :to="`/orders/${order.salesDocumentNum}`" class="btn btn-ghost btn-xs" title="View Order">
                      <Icon name="heroicons:eye" class="h-4 w-4" />
                    </NuxtLink>
                    <button class="btn btn-ghost btn-xs" title="Edit Order">
                      <Icon name="heroicons:pencil" class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>