<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FilterState } from '@/types'

interface Props {
  modelValue: FilterState
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterState): void
  (e: 'search'): void
}>()

const localSearch = ref(props.modelValue.search)
let debounceTimer: ReturnType<typeof setTimeout>

watch(localSearch, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', { ...props.modelValue, search: val })
    emit('search')
  }, 400)
})

function updateFilter(key: keyof FilterState, value: string | number | null): void {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
  emit('search')
}

const cuisines = ['American', 'Asian', 'Brazilian', 'Chinese', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Lebanese', 'Malaysian', 'Mediterranean', 'Mexican', 'Moroccan', 'Pakistani', 'Russian', 'Spanish', 'Thai', 'Turkish']
const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert']
const difficulties = ['Easy', 'Medium', 'Hard']
</script>

<template>
  <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-4">
    <!-- Search -->
    <div class="relative">
      <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        v-model="localSearch"
        type="text"
        placeholder="Search recipes..."
        class="input-field pl-10"
      />
    </div>

    <!-- Filter Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <!-- Cuisine -->
      <div>
        <label class="block text-xs font-medium font-body text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Cuisine</label>
        <select
          :value="modelValue.cuisine"
          @change="updateFilter('cuisine', ($event.target as HTMLSelectElement).value)"
          class="input-field text-sm"
        >
          <option value="">All cuisines</option>
          <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <!-- Difficulty -->
      <div>
        <label class="block text-xs font-medium font-body text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Difficulty</label>
        <div class="flex gap-2">
          <button
            v-for="d in difficulties"
            :key="d"
            @click="updateFilter('difficulty', modelValue.difficulty === d ? '' : d)"
            :class="[
              'flex-1 py-2 text-xs font-medium font-body rounded-lg border transition-all',
              modelValue.difficulty === d
                ? d === 'Easy' ? 'bg-forest-500 text-white border-forest-500' : d === 'Medium' ? 'bg-saffron-500 text-white border-saffron-500' : 'bg-red-500 text-white border-red-500'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
            ]"
          >{{ d }}</button>
        </div>
      </div>

      <!-- Meal Type -->
      <div>
        <label class="block text-xs font-medium font-body text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">Meal Type</label>
        <select
          :value="modelValue.mealType"
          @change="updateFilter('mealType', ($event.target as HTMLSelectElement).value)"
          class="input-field text-sm"
        >
          <option value="">All types</option>
          <option v-for="m in mealTypes" :key="m" :value="m" class="capitalize">{{ m.charAt(0).toUpperCase() + m.slice(1) }}</option>
        </select>
      </div>
    </div>

    <!-- Clear filters -->
    <div v-if="modelValue.search || modelValue.cuisine || modelValue.difficulty || modelValue.mealType" class="flex justify-end">
      <button
        @click="$emit('update:modelValue', { search: '', cuisine: '', difficulty: '', mealType: '', maxCalories: null }); $emit('search')"
        class="text-sm font-body text-stone-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors flex items-center gap-1"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Clear filters
      </button>
    </div>
  </div>
</template>
