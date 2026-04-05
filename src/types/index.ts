// Recipe Types
export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}

// Auth Types
export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}

export interface AuthResponse extends AuthUser {}

// Cart Types
export interface CartItem {
  recipe: Recipe
  servings: number
}

// UI State Types
export interface FilterState {
  search: string
  cuisine: string
  difficulty: string
  mealType: string
  maxCalories: number | null
}

export interface PaginationState {
  skip: number
  limit: number
  total: number
}

// Tag + Cuisine helpers
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | ''
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | ''
