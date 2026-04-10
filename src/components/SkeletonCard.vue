<template>
  <div class="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800">
    <!-- Image skeleton -->
    <div class="aspect-[4/3] shimmer" />

    <!-- Content skeleton -->
    <div class="p-4 space-y-3">
      <div class="flex gap-2">
        <div class="h-5 w-16 shimmer rounded-full" />
        <div class="h-5 w-12 shimmer rounded-full" />
      </div>
      <div class="space-y-2">
        <div class="h-5 shimmer rounded-lg w-full" />
        <div class="h-5 shimmer rounded-lg w-3/4" />
      </div>
      <div class="flex gap-1.5">
        <div class="h-4 w-12 shimmer rounded" />
        <div class="h-4 w-16 shimmer rounded" />
        <div class="h-4 w-10 shimmer rounded" />
      </div>
      <div class="flex justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
        <div class="h-4 w-14 shimmer rounded" />
        <div class="h-4 w-16 shimmer rounded" />
        <div class="h-4 w-14 shimmer rounded" />
      </div>
    </div>
  </div>
</template>
