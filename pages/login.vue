<script setup lang="ts">
definePageMeta({
  layout: false,
  auth: false
})

const { login, isAuthenticated } = useAuth()

// Redirect if already authenticated
if (isAuthenticated.value) {
  await navigateTo('/')
}

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

const validateForm = () => {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  let isValid = true

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.password.trim()) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errors.general = ''

  try {
    const response = await login(form.email, form.password)
    
    if (!response.success) {
      errors.general = response.message || 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    console.error('Login error:', error)
    errors.general = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

useSeoMeta({
  title: 'Login - Maginus Web App',
  description: 'Sign in'
})
</script>

<template>
  <div data-theme="dark" class="min-h-screen flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-base-content mb-2">Maginus</h1>
        <h2 class="text-xl text-base-content/70">Sign in to your account</h2>
      </div>

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email address</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.email }"
                placeholder="Enter your email"
                autocomplete="email"
                :disabled="isLoading"
              />
              <label v-if="errors.email" class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </label>
            </div>

            <!-- Password Field -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="form.password"
                type="password"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.password }"
                placeholder="Enter your password"
                autocomplete="current-password"
                :disabled="isLoading"
              />
              <label v-if="errors.password" class="label">
                <span class="label-text-alt text-error">{{ errors.password }}</span>
              </label>
            </div>

            <!-- General Error -->
            <div v-if="errors.general" class="alert alert-error">
              <Icon name="heroicons:exclamation-triangle" class="h-5 w-5" />
              <span>{{ errors.general }}</span>
            </div>

            <!-- Submit Button -->
            <div class="form-control">
              <button
                type="submit"
                class="btn btn-primary w-full"
                :class="{ 'loading': isLoading }"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Sign in</span>
                <span v-else>Signing in...</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="text-center text-sm text-base-content/50">
        <p>Use your LDAP credentials to sign in</p>
      </div>
    </div>
  </div>
</template>