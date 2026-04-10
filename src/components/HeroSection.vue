<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchQuery = ref('')

function handleSearch(): void {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}

const featuredTags = ['Italian', 'Asian', 'Vegetarian', 'Quick Meals', 'Desserts', 'Breakfast']
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-white dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 pt-16 pb-20">
    <!-- Decorative blobs -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-saffron-100/60 dark:bg-saffron-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-72 h-72 bg-forest-100/40 dark:bg-forest-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Eyebrow -->
      <div class="inline-flex items-center gap-2 bg-saffron-50 dark:bg-saffron-950/50 border border-saffron-200 dark:border-saffron-800 rounded-full px-4 py-1.5 mb-6">
        <span class="text-sm">✨</span>
        <span class="text-sm font-body font-medium text-saffron-700 dark:text-saffron-400">Discover 50+ Recipes from Around the World</span>
      </div>

      <!-- Headline -->
      <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 dark:text-cream-100 mb-4 text-balance leading-tight">
        Cook with
        <span class="italic text-saffron-500"> Confidence</span>
      </h1>

      <p class="font-body text-lg text-stone-500 dark:text-stone-400 mb-10 max-w-xl mx-auto">
        From quick weeknight dinners to weekend feasts — find the perfect recipe for every occasion.
      </p>

      <!-- Search bar -->
      <div class="flex gap-3 max-w-lg mx-auto mb-8">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder='Try "pasta", "chicken", "vegan"...'
            class="input-field pl-12 py-3.5 text-base shadow-sm shadow-stone-200/80 dark:shadow-none"
          />
        </div>
        <button @click="handleSearch" class="btn-primary px-6 py-3.5 text-base">
          Search
        </button>
      </div>

      <!-- Quick tags -->
      <div class="flex flex-wrap justify-center gap-2">
        <span class="text-sm font-body text-stone-400 dark:text-stone-500 self-center">Popular:</span>
        <button
          v-for="tag in featuredTags"
          :key="tag"
          @click="emit('search', tag)"
          class="text-sm font-body px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-saffron-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-all shadow-sm"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </section>
</template>
