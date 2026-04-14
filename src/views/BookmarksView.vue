<script setup lang="ts">
import { useBookmarkStore } from '@/stores/bookmarkStore'
import RecipeCard from '@/components/RecipeCard.vue'

const bookmarkStore = useBookmarkStore()
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-3xl font-bold text-stone-900 dark:text-cream-100">Saved Recipes</h1>
        <p class="font-body text-stone-500 dark:text-stone-400 mt-1">{{ bookmarkStore.bookmarks.length }} recipes saved</p>
      </div>
    </div>

    <div v-if="bookmarkStore.bookmarks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <RecipeCard
        v-for="(recipe, i) in bookmarkStore.bookmarks"
        :key="recipe.id"
        :recipe="recipe"
        :animation-delay="i * 60"
      />
    </div>

    <div v-else class="text-center py-24">
      <div class="text-6xl mb-4">🔖</div>
      <h3 class="font-display text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">No saved recipes yet</h3>
      <p class="font-body text-stone-400 dark:text-stone-500 mb-6">Tap the bookmark icon on any recipe to save it here</p>
      <RouterLink to="/" class="btn-primary inline-flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        Discover Recipes
      </RouterLink>
    </div>
  </main>
</template>
