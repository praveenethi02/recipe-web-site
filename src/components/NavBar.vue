<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useDarkMode } from '@/composables/useDarkMode'
import LoginModal from './LoginModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()
const { isDark, toggleDark } = useDarkMode()

const showLoginModal = ref(false)
const mobileMenuOpen = ref(false)

const cartCount = computed(() => bookmarkStore.cartCount)
const bookmarkCount = computed(() => bookmarkStore.bookmarks.length)

function handleLogout(): void {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-lg border-b border-stone-200/60 dark:border-stone-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-9 h-9 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-xl flex items-center justify-center shadow-md shadow-saffron-200 dark:shadow-saffron-900/40 group-hover:scale-105 transition-transform">
            <span class="text-white text-lg">🍳</span>
          </div>
          <span class="font-display text-xl font-bold text-stone-900 dark:text-cream-100 hidden sm:block">
            Recipe<span class="text-saffron-500">Craft</span>
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink to="/" class="px-4 py-2 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-saffron-950/20 transition-all">
            Discover
          </RouterLink>
          <RouterLink to="/bookmarks" class="relative px-4 py-2 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-saffron-950/20 transition-all">
            Saved
            <span v-if="bookmarkCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-saffron-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {{ bookmarkCount > 9 ? '9+' : bookmarkCount }}
            </span>
          </RouterLink>
          <RouterLink to="/cart" class="relative px-4 py-2 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-saffron-950/20 transition-all">
            Meal Plan
            <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </RouterLink>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <!-- Dark mode toggle -->
          <button @click="toggleDark" class="btn-ghost" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>

          <!-- Auth -->
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center gap-2">
              <img :src="authStore.user?.image" :alt="authStore.displayName" class="w-8 h-8 rounded-full border-2 border-saffron-300 hidden sm:block" />
              <span class="text-sm font-medium text-stone-700 dark:text-stone-300 hidden lg:block">{{ authStore.user?.firstName }}</span>
              <button @click="handleLogout" class="btn-secondary text-sm py-1.5 px-3">Sign out</button>
            </div>
          </template>
          <template v-else>
            <button @click="showLoginModal = true" class="btn-primary text-sm py-1.5 px-4">Sign in</button>
          </template>

          <!-- Mobile menu toggle -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="btn-ghost md:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-1">
          <RouterLink to="/" @click="mobileMenuOpen = false" class="block px-4 py-2.5 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-saffron-50 dark:hover:bg-saffron-950/20">
            🔍 Discover Recipes
          </RouterLink>
          <RouterLink to="/bookmarks" @click="mobileMenuOpen = false" class="flex items-center justify-between px-4 py-2.5 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-saffron-50 dark:hover:bg-saffron-950/20">
            <span>🔖 Saved Recipes</span>
            <span v-if="bookmarkCount > 0" class="bg-saffron-500 text-white text-xs px-2 py-0.5 rounded-full">{{ bookmarkCount }}</span>
          </RouterLink>
          <RouterLink to="/cart" @click="mobileMenuOpen = false" class="flex items-center justify-between px-4 py-2.5 rounded-xl font-body text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-saffron-50 dark:hover:bg-saffron-950/20">
            <span>📋 Meal Plan</span>
            <span v-if="cartCount > 0" class="bg-forest-500 text-white text-xs px-2 py-0.5 rounded-full">{{ cartCount }}</span>
          </RouterLink>
        </div>
      </Transition>
    </div>
  </nav>

  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
