<script setup lang="ts">
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useRouter } from 'vue-router'

const bookmarkStore = useBookmarkStore()
const router = useRouter()
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-3xl font-bold text-stone-900 dark:text-cream-100">Meal Plan</h1>
        <p class="font-body text-stone-500 dark:text-stone-400 mt-1">{{ bookmarkStore.cartCount }} recipes planned</p>
      </div>
      <button v-if="bookmarkStore.cart.length > 0" @click="bookmarkStore.clearCart()" class="btn-secondary text-sm text-red-500 hover:text-red-600 border-red-200 hover:border-red-300">
        Clear all
      </button>
    </div>

    <div v-if="bookmarkStore.cart.length > 0" class="space-y-4">
      <!-- Cart items -->
      <div v-for="item in bookmarkStore.cart" :key="item.recipe.id"
           class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 p-4 flex gap-4 animate-slide-up">
        <img
          :src="item.recipe.image"
          :alt="item.recipe.name"
          class="w-20 h-20 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          @click="router.push({ name: 'recipe-detail', params: { id: item.recipe.id } })"
        />
        <div class="flex-1 min-w-0">
          <h3 class="font-display font-semibold text-stone-900 dark:text-cream-100 truncate">{{ item.recipe.name }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="tag-pill text-xs">🌍 {{ item.recipe.cuisine }}</span>
            <span class="text-xs font-body text-stone-400">{{ item.recipe.difficulty }}</span>
          </div>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2">
              <button
                @click="bookmarkStore.updateServings(item.recipe.id, item.servings - 1)"
                :disabled="item.servings <= 1"
                class="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:border-saffron-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-bold"
              >−</button>
              <span class="font-body text-sm font-medium text-stone-700 dark:text-stone-300 min-w-[60px] text-center">
                {{ item.servings }} servings
              </span>
              <button
                @click="bookmarkStore.updateServings(item.recipe.id, item.servings + 1)"
                class="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:border-saffron-400 transition-all text-sm font-bold"
              >+</button>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-body font-medium text-saffron-600 dark:text-saffron-400">
                🔥 {{ item.recipe.caloriesPerServing * item.servings }} kcal
              </span>
              <button
                @click="bookmarkStore.removeFromCart(item.recipe.id)"
                class="text-stone-300 hover:text-red-400 dark:text-stone-600 dark:hover:text-red-400 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-saffron-50 dark:bg-saffron-950/20 border border-saffron-200 dark:border-saffron-800 rounded-2xl p-5 mt-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-body text-sm text-saffron-600 dark:text-saffron-400 font-medium">Total Estimated Calories</p>
            <p class="font-display text-3xl font-bold text-saffron-700 dark:text-saffron-300 mt-1">
              {{ bookmarkStore.cartTotal.toLocaleString() }} <span class="text-base font-body font-normal">kcal</span>
            </p>
          </div>
          <div class="text-5xl">🍽️</div>
        </div>
        <p class="text-xs font-body text-saffron-500 dark:text-saffron-500 mt-2">
          Based on {{ bookmarkStore.cart.reduce((sum, i) => sum + i.servings, 0) }} total servings across {{ bookmarkStore.cartCount }} recipes
        </p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-24">
      <div class="text-6xl mb-4">📋</div>
      <h3 class="font-display text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">Your meal plan is empty</h3>
      <p class="font-body text-stone-400 dark:text-stone-500 mb-6">Add recipes from the detail page to plan your meals</p>
      <RouterLink to="/" class="btn-primary inline-flex items-center gap-2">
        Browse Recipes
      </RouterLink>
    </div>
  </main>
</template>
