<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Recipe } from '@/types'
import { useBookmarkStore } from '@/stores/bookmarkStore'

interface Props {
  recipe: Recipe
  animationDelay?: number
}

const props = defineProps<Props>()
const router = useRouter()
const bookmarkStore = useBookmarkStore()

const isBookmarked = computed(() => bookmarkStore.isBookmarked(props.recipe.id))

const difficultyClass = computed(() => {
  switch (props.recipe.difficulty) {
    case 'Easy': return 'difficulty-easy'
    case 'Medium': return 'difficulty-medium'
    case 'Hard': return 'difficulty-hard'
    default: return 'tag-pill'
  }
})

const totalTime = computed(() => props.recipe.prepTimeMinutes + props.recipe.cookTimeMinutes)

function toggleBookmark(e: MouseEvent): void {
  e.stopPropagation()
  bookmarkStore.toggleBookmark(props.recipe)
}

function goToDetail(): void {
  router.push({ name: 'recipe-detail', params: { id: props.recipe.id } })
}
</script>

<template>
  <article
    class="card cursor-pointer group animate-fade-in"
    :style="{ animationDelay: `${animationDelay ?? 0}ms` }"
    @click="goToDetail"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Difficulty badge -->
      <div class="absolute top-3 left-3">
        <span :class="['text-xs font-body font-medium px-2.5 py-1 rounded-full', difficultyClass]">
          {{ recipe.difficulty }}
        </span>
      </div>

      <!-- Bookmark button -->
      <button
        @click="toggleBookmark"
        :class="[
          'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
          isBookmarked
            ? 'bg-saffron-500 text-white shadow-lg'
            : 'bg-white/80 dark:bg-stone-800/80 text-stone-600 hover:bg-saffron-50 hover:text-saffron-600'
        ]"
        :title="isBookmarked ? 'Remove bookmark' : 'Save recipe'"
      >
        <svg class="w-4 h-4" :fill="isBookmarked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </button>

      <!-- Rating overlay on hover -->
      <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
        <div class="flex gap-0.5">
          <span v-for="i in 5" :key="i" :class="i <= Math.round(recipe.rating) ? 'text-saffron-400' : 'text-white/40'" class="text-xs">★</span>
        </div>
        <span class="text-white text-xs font-body font-medium ml-1">{{ recipe.rating.toFixed(1) }} ({{ recipe.reviewCount }})</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Cuisine + meal type -->
      <div class="flex items-center gap-2 mb-2">
        <span class="tag-pill text-xs">🌍 {{ recipe.cuisine }}</span>
        <span v-if="recipe.mealType[0]" class="tag-pill text-xs capitalize">{{ recipe.mealType[0] }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-display text-lg font-semibold text-stone-900 dark:text-cream-100 line-clamp-2 mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
        {{ recipe.name }}
      </h3>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-3">
        <span v-for="tag in recipe.tags.slice(0, 3)" :key="tag" class="text-xs font-body text-stone-400 dark:text-stone-500">
          #{{ tag.toLowerCase().replace(/\s+/g, '') }}
        </span>
      </div>

      <!-- Footer: time + calories -->
      <div class="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-1 text-stone-500 dark:text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-xs font-body font-medium">{{ totalTime }} min</span>
        </div>
        <div class="flex items-center gap-1 text-stone-500 dark:text-stone-400">
          <span class="text-xs">🔥</span>
          <span class="text-xs font-body font-medium">{{ recipe.caloriesPerServing }} kcal</span>
        </div>
        <div class="flex items-center gap-1 text-stone-500 dark:text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-xs font-body font-medium">{{ recipe.servings }} servings</span>
        </div>
      </div>
    </div>
  </article>
</template>
