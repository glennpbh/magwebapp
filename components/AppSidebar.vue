<script setup lang="ts">
const route = useRoute()

const menuItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: 'heroicons:home'
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: 'heroicons:users'
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: 'heroicons:chart-bar'
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: 'heroicons:cog-6-tooth'
  }
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === path
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <ul class="menu w-full">
    <li v-for="item in menuItems" :key="item.path">
      <NuxtLink
        :to="item.path"
        :class="{ 'active': isActive(item.path) }"
        class="flex items-center gap-3"
      >
        <Icon :name="item.icon" class="h-5 w-5" />
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
</template>