import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Recipe, CartItem } from '@/types'

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Recipe[]>([])
  const cart = ref<CartItem[]>([])

  // Hydrate from localStorage
  function loadFromStorage(): void {
    const storedBookmarks = localStorage.getItem('recipe_bookmarks')
    const storedCart = localStorage.getItem('recipe_cart')
    if (storedBookmarks) bookmarks.value = JSON.parse(storedBookmarks) as Recipe[]
    if (storedCart) cart.value = JSON.parse(storedCart) as CartItem[]
  }

  // Persist on every change
  watch(bookmarks, (val) => {
    localStorage.setItem('recipe_bookmarks', JSON.stringify(val))
  }, { deep: true })

  watch(cart, (val) => {
    localStorage.setItem('recipe_cart', JSON.stringify(val))
  }, { deep: true })

  const isBookmarked = computed(() => (id: number) =>
    bookmarks.value.some(r => r.id === id)
  )

  const cartCount = computed(() => cart.value.length)

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.recipe.caloriesPerServing * item.servings, 0)
  )

  function toggleBookmark(recipe: Recipe): void {
    const idx = bookmarks.value.findIndex(r => r.id === recipe.id)
    if (idx >= 0) {
      bookmarks.value.splice(idx, 1)
    } else {
      bookmarks.value.push(recipe)
    }
  }

  function addToCart(recipe: Recipe, servings = 1): void {
    const existing = cart.value.find(item => item.recipe.id === recipe.id)
    if (existing) {
      existing.servings += servings
    } else {
      cart.value.push({ recipe, servings })
    }
  }

  function removeFromCart(recipeId: number): void {
    const idx = cart.value.findIndex(item => item.recipe.id === recipeId)
    if (idx >= 0) cart.value.splice(idx, 1)
  }

  function updateServings(recipeId: number, servings: number): void {
    const item = cart.value.find(i => i.recipe.id === recipeId)
    if (item) item.servings = Math.max(1, servings)
  }

  function clearCart(): void {
    cart.value = []
  }

  return {
    bookmarks,
    cart,
    isBookmarked,
    cartCount,
    cartTotal,
    loadFromStorage,
    toggleBookmark,
    addToCart,
    removeFromCart,
    updateServings,
    clearCart
  }
})
