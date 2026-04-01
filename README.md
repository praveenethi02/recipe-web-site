# RecipeCraft 🍳

A production-quality food recipe Single Page Application built with **Vue 3**, **TypeScript**, **Pinia**, **Vue Router**, and **Tailwind CSS**. Consumes the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes).

## Features

- 🔍 **Recipe Discovery** — Browse, search, and filter 50+ recipes
- 🌍 **Filter by** cuisine, difficulty, and meal type
- 📄 **Detail View** — Dynamic route `/recipe/:id` with ingredient/instruction tabs and serving scaler
- 🔖 **Bookmarks** — Save recipes; persisted to localStorage
- 📋 **Meal Planner** — Add recipes to a meal plan with adjustable servings and calorie totals
- 🔐 **Auth Simulation** — Login via DummyJSON `/auth/login`; JWT stored in localStorage
- 🌙 **Dark Mode** — Tailwind `dark:` modifier; preference persisted

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript (strict mode, no `any`) |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| State | Pinia |
| Routing | Vue Router 4 |
| API | DummyJSON.com |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone or extract the project
cd recipe-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Demo Login

Use these DummyJSON test credentials to try the auth feature:

- **Username:** `emilys`
- **Password:** `emilyspass`

## Project Structure

```
src/
├── main.ts                 # App entry point
├── App.vue                 # Root component
├── style.css               # Global styles + Tailwind
├── types/index.ts          # All TypeScript interfaces
├── composables/
│   ├── useRecipeApi.ts     # API calls composable
│   └── useDarkMode.ts      # Dark mode composable
├── stores/
│   ├── authStore.ts        # Auth (Pinia)
│   └── bookmarkStore.ts    # Bookmarks + cart (Pinia)
├── router/index.ts         # Vue Router config
├── components/
│   ├── NavBar.vue
│   ├── HeroSection.vue
│   ├── FilterBar.vue
│   ├── RecipeCard.vue
│   ├── RecipeGrid.vue
│   ├── SkeletonCard.vue
│   └── LoginModal.vue
└── views/
    ├── HomeView.vue
    ├── RecipeDetailView.vue
    ├── BookmarksView.vue
    └── CartView.vue
```
