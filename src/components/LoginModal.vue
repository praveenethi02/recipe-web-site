<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const authStore = useAuthStore()
const username = ref('emilys')
const password = ref('emilyspass')

async function handleSubmit(): Promise<void> {
  const success = await authStore.login({ username: username.value, password: password.value })
  if (success) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')" />

      <!-- Modal -->
      <div class="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-scale-in">
        <!-- Close -->
        <button @click="emit('close')" class="absolute top-4 right-4 btn-ghost">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="text-center mb-6">
          <div class="w-14 h-14 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-saffron-200 dark:shadow-saffron-900/40">
            <span class="text-2xl">🍳</span>
          </div>
          <h2 class="font-display text-2xl font-bold text-stone-900 dark:text-cream-100">Welcome back</h2>
          <p class="font-body text-sm text-stone-500 dark:text-stone-400 mt-1">Sign in to save your favorite recipes</p>
        </div>

        <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-5">
          <p class="text-xs font-body text-amber-700 dark:text-amber-400 text-center">
            Demo credentials pre-filled — just click Sign In!
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium font-body text-stone-700 dark:text-stone-300 mb-1.5">Username</label>
            <input v-model="username" type="text" class="input-field" placeholder="emilys" />
          </div>
          <div>
            <label class="block text-sm font-medium font-body text-stone-700 dark:text-stone-300 mb-1.5">Password</label>
            <input v-model="password" type="password" class="input-field" placeholder="••••••••" />
          </div>

          <p v-if="authStore.error" class="text-sm text-red-600 dark:text-red-400 font-body text-center">
            {{ authStore.error }}
          </p>

          <button @click="handleSubmit" :disabled="authStore.loading" class="btn-primary w-full justify-center flex items-center gap-2">
            <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
