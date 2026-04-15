<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useDarkMode } from '@/composables/useDarkMode'

const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()
const { initTheme } = useDarkMode()

onMounted(() => {
  initTheme()
  authStore.loadFromStorage()
  bookmarkStore.loadFromStorage()
})
</script>

<template>
  <div class="min-h-screen bg-cream-50 dark:bg-stone-950">
    <NavBar />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- Footer -->
    <footer class="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-lg flex items-center justify-center">
            <span class="text-white text-sm">🍳</span>
          </div>
          <span class="font-display font-bold text-stone-700 dark:text-stone-300">RecipeCraft</span>
        </div>
        <p class="font-body text-sm text-stone-400 dark:text-stone-500">
          Powered by <a href="https://dummyjson.com" target="_blank" class="text-saffron-500 hover:text-saffron-600 transition-colors">DummyJSON API</a>
        </p>
      </div>
    </footer>
  </div>
</template>
