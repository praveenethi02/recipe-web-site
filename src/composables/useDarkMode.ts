import { ref, watchEffect } from 'vue'

const isDark = ref<boolean>(false)

function initTheme(): void {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    isDark.value = true
  } else if (stored === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

export function useDarkMode() {
  function toggleDark(): void {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDark, initTheme }
}
