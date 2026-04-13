<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Recipe, FilterState } from '@/types'
import { useRecipeApi } from '@/composables/useRecipeApi'
import HeroSection from '@/components/HeroSection.vue'
import FilterBar from '@/components/FilterBar.vue'
import RecipeGrid from '@/components/RecipeGrid.vue'

const { loading, fetchRecipes, searchRecipes, applyClientFilters } = useRecipeApi()

const allFetched = ref<Recipe[]>([])
const displayedRecipes = ref<Recipe[]>([])
const total = ref(0)
const skip = ref(0)
const LIMIT = 20

const filters = reactive<FilterState>({
  search: '',
  cuisine: '',
  difficulty: '',
  mealType: '',
  maxCalories: null
})

const hasMore = ref(false)

async function loadRecipes(reset = false): Promise<void> {
  if (reset) {
    skip.value = 0
    allFetched.value = []
  }

  let result
  if (filters.search) {
    result = await searchRecipes(filters.search, skip.value, LIMIT)
  } else if (filters.mealType) {
    const { fetchRecipesByMealType } = useRecipeApi()
    result = await fetchRecipesByMealType(filters.mealType)
  } else {
    result = await fetchRecipes(skip.value, LIMIT)
  }

  if (reset) {
    allFetched.value = result.recipes
  } else {
    allFetched.value = [...allFetched.value, ...result.recipes]
  }

  total.value = result.total
  skip.value += result.recipes.length
  hasMore.value = allFetched.value.length < result.total

  applyFilters()
}

function applyFilters(): void {
  displayedRecipes.value = applyClientFilters(allFetched.value, filters)
}

async function handleSearch(): Promise<void> {
  await loadRecipes(true)
}

async function handleHeroSearch(query: string): Promise<void> {
  filters.search = query
  await loadRecipes(true)
  // Scroll to recipes section
  document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })
}

async function handleLoadMore(): Promise<void> {
  await loadRecipes(false)
}

onMounted(() => {
  loadRecipes(true)
})
</script>

<template>
  <div>
    <HeroSection @search="handleHeroSearch" />

    <main id="recipes-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-display text-2xl font-bold text-stone-900 dark:text-cream-100">
          {{ filters.search ? `Results for "${filters.search}"` : 'All Recipes' }}
        </h2>
        <span v-if="!loading" class="text-sm font-body text-stone-400">{{ total }} recipes</span>
      </div>

      <div class="mb-6">
        <FilterBar v-model="filters" @search="handleSearch" />
      </div>

      <RecipeGrid
        :recipes="displayedRecipes"
        :loading="loading"
        :total="total"
        :has-more="hasMore"
        @load-more="handleLoadMore"
      />
    </main>
  </div>
</template>
