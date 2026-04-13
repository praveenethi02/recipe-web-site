<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Recipe } from '@/types'
import { useRecipeApi } from '@/composables/useRecipeApi'
import { useBookmarkStore } from '@/stores/bookmarkStore'

interface Props {
  id: number
}

const props = defineProps<Props>()
const router = useRouter()
const { loading, error, fetchRecipeById } = useRecipeApi()
const bookmarkStore = useBookmarkStore()

const recipe = ref<Recipe | null>(null)
const activeTab = ref<'ingredients' | 'instructions'>('ingredients')
const servingMultiplier = ref(1)

const isBookmarked = computed(() => recipe.value ? bookmarkStore.isBookmarked(recipe.value.id) : false)

const totalTime = computed(() => recipe.value
  ? recipe.value.prepTimeMinutes + recipe.value.cookTimeMinutes
  : 0
)

const scaledServings = computed(() =>
  recipe.value ? Math.round(recipe.value.servings * servingMultiplier.value) : 0
)

const difficultyColor = computed(() => {
  switch (recipe.value?.difficulty) {
    case 'Easy': return 'text-forest-600 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/30'
    case 'Medium': return 'text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/30'
    case 'Hard': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30'
    default: return 'text-stone-600 bg-stone-50'
  }
})

function handleBookmark(): void {
  if (recipe.value) bookmarkStore.toggleBookmark(recipe.value)
}

function handleAddToCart(): void {
  if (recipe.value) {
    bookmarkStore.addToCart(recipe.value, servingMultiplier.value)
  }
}

onMounted(async () => {
  recipe.value = await fetchRecipeById(props.id)
  if (!recipe.value) {
    router.replace('/')
  }
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading -->
    <div v-if="loading" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="shimmer h-8 w-32 rounded-lg mb-8" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="shimmer aspect-square rounded-3xl" />
        <div class="space-y-4">
          <div class="shimmer h-10 w-3/4 rounded-lg" />
          <div class="shimmer h-6 w-1/2 rounded-lg" />
          <div class="grid grid-cols-3 gap-3 mt-6">
            <div v-for="i in 3" :key="i" class="shimmer h-20 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-24">
      <div class="text-6xl mb-4">😕</div>
      <h3 class="font-display text-2xl font-bold text-stone-700 dark:text-stone-300 mb-4">Recipe not found</h3>
      <button @click="router.push('/')" class="btn-primary">Go back home</button>
    </div>

    <!-- Recipe content -->
    <div v-else-if="recipe" class="animate-fade-in">
      <!-- Hero image + Back button -->
      <div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img :src="recipe.image" :alt="recipe.name" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div class="absolute top-4 left-4">
          <button @click="router.back()" class="flex items-center gap-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-stone-700 dark:text-stone-200 px-4 py-2 rounded-xl font-body text-sm font-medium hover:bg-white dark:hover:bg-stone-900 transition-all shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </div>
        <!-- Title overlay on mobile -->
        <div class="absolute bottom-6 left-6 right-6 lg:hidden">
          <h1 class="font-display text-3xl font-bold text-white text-balance">{{ recipe.name }}</h1>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left: Main content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Header card -->
            <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
              <h1 class="font-display text-3xl font-bold text-stone-900 dark:text-cream-100 mb-3 hidden lg:block">{{ recipe.name }}</h1>

              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span :class="['text-sm font-body font-semibold px-3 py-1 rounded-full', difficultyColor]">
                  {{ recipe.difficulty }}
                </span>
                <span class="tag-pill">🌍 {{ recipe.cuisine }}</span>
                <span v-for="type in recipe.mealType" :key="type" class="tag-pill capitalize">{{ type }}</span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2 mb-4">
                <div class="flex gap-0.5">
                  <span v-for="i in 5" :key="i" :class="i <= Math.round(recipe.rating) ? 'text-saffron-400' : 'text-stone-200 dark:text-stone-700'" class="text-lg">★</span>
                </div>
                <span class="font-body font-semibold text-stone-700 dark:text-stone-300">{{ recipe.rating.toFixed(1) }}</span>
                <span class="text-sm text-stone-400 font-body">({{ recipe.reviewCount }} reviews)</span>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in recipe.tags" :key="tag" class="text-xs font-body text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-800 px-2.5 py-1 rounded-full">
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Stats bar -->
            <div class="grid grid-cols-4 gap-3">
              <div v-for="stat in [
                { icon: '⏱', label: 'Prep', value: recipe.prepTimeMinutes + ' min' },
                { icon: '🔥', label: 'Cook', value: recipe.cookTimeMinutes + ' min' },
                { icon: '⏰', label: 'Total', value: totalTime + ' min' },
                { icon: '🍽', label: 'Calories', value: recipe.caloriesPerServing + ' kcal' }
              ]" :key="stat.label" class="bg-white dark:bg-stone-900 rounded-2xl p-4 text-center border border-stone-100 dark:border-stone-800 shadow-sm">
                <div class="text-2xl mb-1">{{ stat.icon }}</div>
                <div class="font-body font-bold text-stone-900 dark:text-cream-100 text-sm">{{ stat.value }}</div>
                <div class="text-xs font-body text-stone-400 dark:text-stone-500">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Ingredients / Instructions tabs -->
            <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm overflow-hidden">
              <div class="flex border-b border-stone-100 dark:border-stone-800">
                <button
                  @click="activeTab = 'ingredients'"
                  :class="[
                    'flex-1 py-4 font-body font-semibold text-sm transition-all',
                    activeTab === 'ingredients'
                      ? 'text-saffron-600 dark:text-saffron-400 border-b-2 border-saffron-500 bg-saffron-50/50 dark:bg-saffron-950/10'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  ]"
                >
                  🥦 Ingredients ({{ recipe.ingredients.length }})
                </button>
                <button
                  @click="activeTab = 'instructions'"
                  :class="[
                    'flex-1 py-4 font-body font-semibold text-sm transition-all',
                    activeTab === 'instructions'
                      ? 'text-saffron-600 dark:text-saffron-400 border-b-2 border-saffron-500 bg-saffron-50/50 dark:bg-saffron-950/10'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  ]"
                >
                  📋 Instructions ({{ recipe.instructions.length }})
                </button>
              </div>

              <div class="p-6">
                <!-- Ingredients tab -->
                <div v-if="activeTab === 'ingredients'">
                  <!-- Servings adjuster -->
                  <div class="flex items-center justify-between mb-5 pb-4 border-b border-stone-100 dark:border-stone-800">
                    <span class="text-sm font-body font-medium text-stone-600 dark:text-stone-400">Adjust servings</span>
                    <div class="flex items-center gap-3">
                      <button
                        @click="servingMultiplier = Math.max(0.5, servingMultiplier - 0.5)"
                        class="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:border-saffron-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-all font-bold"
                      >−</button>
                      <span class="font-body font-semibold text-stone-800 dark:text-cream-100 min-w-[60px] text-center">
                        {{ scaledServings }} servings
                      </span>
                      <button
                        @click="servingMultiplier += 0.5"
                        class="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:border-saffron-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-all font-bold"
                      >+</button>
                    </div>
                  </div>

                  <ul class="space-y-2.5">
                    <li v-for="(ingredient, i) in recipe.ingredients" :key="i"
                        class="flex items-start gap-3 py-2 border-b border-stone-50 dark:border-stone-800/50 last:border-0">
                      <span class="flex-shrink-0 w-5 h-5 bg-saffron-100 dark:bg-saffron-950/50 rounded-full flex items-center justify-center mt-0.5">
                        <span class="w-1.5 h-1.5 bg-saffron-500 rounded-full"></span>
                      </span>
                      <span class="font-body text-stone-700 dark:text-stone-300 text-sm leading-relaxed">{{ ingredient }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Instructions tab -->
                <div v-if="activeTab === 'instructions'">
                  <ol class="space-y-5">
                    <li v-for="(instruction, i) in recipe.instructions" :key="i" class="flex gap-4">
                      <span class="flex-shrink-0 w-8 h-8 bg-saffron-500 text-white rounded-full flex items-center justify-center font-body font-bold text-sm mt-0.5">
                        {{ i + 1 }}
                      </span>
                      <p class="font-body text-stone-700 dark:text-stone-300 text-sm leading-relaxed pt-1">{{ instruction }}</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Sidebar actions -->
          <div class="space-y-4">
            <!-- Actions card -->
            <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm sticky top-24 space-y-3">
              <h3 class="font-display text-lg font-bold text-stone-900 dark:text-cream-100 mb-4">Quick Actions</h3>

              <button @click="handleAddToCart" class="btn-primary w-full flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add to Meal Plan
              </button>

              <button @click="handleBookmark" :class="['btn-secondary w-full flex items-center justify-center gap-2', isBookmarked ? 'border-saffron-400 text-saffron-600 dark:text-saffron-400' : '']">
                <svg class="w-4 h-4" :fill="isBookmarked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                {{ isBookmarked ? '✓ Saved' : 'Save Recipe' }}
              </button>

              <!-- Nutrition info -->
              <div class="pt-4 border-t border-stone-100 dark:border-stone-800">
                <h4 class="text-sm font-body font-semibold text-stone-600 dark:text-stone-400 mb-3 uppercase tracking-wider">Per Serving</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-body text-stone-500 dark:text-stone-400">Calories</span>
                    <span class="text-sm font-body font-semibold text-stone-800 dark:text-cream-100">{{ recipe.caloriesPerServing }} kcal</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-body text-stone-500 dark:text-stone-400">Servings</span>
                    <span class="text-sm font-body font-semibold text-stone-800 dark:text-cream-100">{{ recipe.servings }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
