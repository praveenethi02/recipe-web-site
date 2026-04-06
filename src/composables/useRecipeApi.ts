import { ref } from 'vue'
import type { Recipe, RecipesResponse, FilterState } from '@/types'

const BASE_URL = 'https://dummyjson.com'

export function useRecipeApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRecipes(skip = 0, limit = 12): Promise<RecipesResponse> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/recipes?limit=${limit}&skip=${skip}`)
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
      return await res.json() as RecipesResponse
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return { recipes: [], total: 0, skip, limit }
    } finally {
      loading.value = false
    }
  }

  async function searchRecipes(query: string, skip = 0, limit = 12): Promise<RecipesResponse> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/recipes/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`)
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
      return await res.json() as RecipesResponse
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return { recipes: [], total: 0, skip, limit }
    } finally {
      loading.value = false
    }
  }

  async function fetchRecipeById(id: number): Promise<Recipe | null> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/recipes/${id}`)
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
      return await res.json() as Recipe
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchRecipesByTag(tag: string): Promise<RecipesResponse> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/recipes/tag/${encodeURIComponent(tag)}`)
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
      return await res.json() as RecipesResponse
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return { recipes: [], total: 0, skip: 0, limit: 12 }
    } finally {
      loading.value = false
    }
  }

  async function fetchRecipesByMealType(mealType: string): Promise<RecipesResponse> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/recipes/meal-type/${encodeURIComponent(mealType)}`)
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
      return await res.json() as RecipesResponse
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return { recipes: [], total: 0, skip: 0, limit: 12 }
    } finally {
      loading.value = false
    }
  }

  function applyClientFilters(recipes: Recipe[], filters: FilterState): Recipe[] {
    return recipes.filter(recipe => {
      if (filters.cuisine && recipe.cuisine.toLowerCase() !== filters.cuisine.toLowerCase()) return false
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false
      if (filters.maxCalories && recipe.caloriesPerServing > filters.maxCalories) return false
      return true
    })
  }

  return {
    loading,
    error,
    fetchRecipes,
    searchRecipes,
    fetchRecipeById,
    fetchRecipesByTag,
    fetchRecipesByMealType,
    applyClientFilters
  }
}
