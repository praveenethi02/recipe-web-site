<script setup lang="ts">
import type { Recipe } from '@/types'
import RecipeCard from './RecipeCard.vue'
import SkeletonCard from './SkeletonCard.vue'

interface Props {
  recipes: Recipe[]
  loading: boolean
  total: number
  hasMore: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'loadMore'): void
}>()
</script>

<template>
  <div>
    <!-- Grid -->
    <div v-if="loading && recipes.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="recipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <RecipeCard
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :animation-delay="(index % 8) * 60"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-24">
      <div class="text-6xl mb-4">🍽️</div>
      <h3 class="font-display text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">No recipes found</h3>
      <p class="font-body text-stone-400 dark:text-stone-500">Try adjusting your search or filters</p>
    </div>

    <!-- Results count + Load more -->
    <div v-if="recipes.length > 0" class="mt-8 flex flex-col items-center gap-4">
      <p class="text-sm font-body text-stone-400 dark:text-stone-500">
        Showing <span class="font-semibold text-stone-600 dark:text-stone-300">{{ recipes.length }}</span> of <span class="font-semibold text-stone-600 dark:text-stone-300">{{ total }}</span> recipes
      </p>
      <button
        v-if="hasMore"
        @click="$emit('loadMore')"
        :disabled="loading"
        class="btn-secondary flex items-center gap-2"
      >
        <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ loading ? 'Loading...' : 'Load more recipes' }}
      </button>
    </div>
  </div>
</template>
