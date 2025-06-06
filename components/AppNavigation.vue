<script setup lang="ts">
const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full bg-primary flex items-center justify-center">
        <Icon name="heroicons:user" class="h-6 w-6 text-primary-content" />
      </div>
    </div>
    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
      <li class="menu-title">
        <span>{{ user?.displayName || user?.email }}</span>
      </li>
      <li>
        <NuxtLink to="/profile" class="justify-between">
          <span>
            <Icon name="heroicons:user-circle" class="h-4 w-4" />
            Profile
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/settings" class="justify-between">
          <span>
            <Icon name="heroicons:cog-6-tooth" class="h-4 w-4" />
            Settings
          </span>
        </NuxtLink>
      </li>
      <div class="divider my-1"></div>
      <li>
        <button @click="handleLogout" class="text-error">
          <Icon name="heroicons:arrow-right-on-rectangle" class="h-4 w-4" />
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>