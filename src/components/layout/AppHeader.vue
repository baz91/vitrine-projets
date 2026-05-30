<template>
  <header class="header" :class="{ open }" ref="headerRef">

    <!-- TOP BAR -->
    <div class="top" ref="headerRef">

      <router-link to="/" class="logo">
        Studio Projets
      </router-link>

      <button
        class="menu-btn"
        @click="toggleMenu"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>

    </div>

    <!-- ACCORDION -->
    <div class="accordion" :inert="!open">

      <div class="search">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un projet..."
          :tabindex="open ? 0 : -1"
        />
      </div>

      <nav class="links">
        <a href="#" :tabindex="open ? 0 : -1">Qui sommes-nous</a>
        <a href="#" :tabindex="open ? 0 : -1">Contact</a>
      </nav>

    </div>

  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const search = ref('')
const headerRef = ref(null)

const toggleMenu = () => {
  open.value = !open.value
}

/* fermeture au clic extérieur */
const handleClickOutside = (e) => {
  if (!headerRef.value) return

  const path = e.composedPath?.()

  // si click est dans le header → on ignore
  if (path && path.includes(headerRef.value)) return

  open.value = false
}

/* fermeture ESC */
const handleKey = (e) => {
  if (e.key === 'Escape') {
    open.value = false
  }
}

const handleFocusOut = (e) => {
  const header = headerRef.value
  if (!header) return

  // element vers lequel le focus part
  const nextFocused = e.relatedTarget

  // si le nouveau focus est en dehors du header → fermeture
  if (nextFocused && !header.contains(nextFocused)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKey)
  headerRef.value?.addEventListener('focusout', handleFocusOut)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKey)
  headerRef.value?.removeEventListener('focusout', handleFocusOut)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 1000;

  background: var(--color-secondary);
  backdrop-filter: blur(10px);

  color: var(--color-primary);

  overflow: hidden;

  transition: 0.35s ease;
}

/* TOP BAR plus compact */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 24px; /* réduit */
}

/* LOGO */
.logo {
  color: var(--color-primary);
  text-decoration: none;

  font-size: 14px; /* réduit */
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* BUTTON */
.menu-btn {
  background: transparent;

  padding: 4px 10px; /* réduit */
  border-radius: 999px;

  font-size: 12px;

  cursor: pointer;

  transition: 0.25s;
}

.menu-btn:hover {
  background: rgba(255,255,255,0.15);
}

/* ACCORDION */
.accordion {
  max-height: 0;
  opacity: 0;

  overflow: hidden;

  transform: translateY(-6px);

  transition: all 0.35s ease;

  padding: 0 24px;
}

/* OPEN STATE */
.header.open .accordion {
  max-height: 140px;
  opacity: 1;
  transform: translateY(0);
  padding-bottom: 14px;
}

/* SEARCH */
.search input {
  width: 100%;

  padding: 8px 10px; /* réduit */

  margin-top: 8px;

  border-radius: 6px;
  border: none;

  outline: none;

  font-size: 12px;
}

/* LINKS */
.links {
  display: flex;
  gap: 16px;

  margin-top: 10px;
}

.links a {
  color: white;
  text-decoration: none;

  font-size: 12px;

  opacity: 0.75;

  transition: 0.2s;
}

.links a:hover {
  opacity: 1;
}</style>