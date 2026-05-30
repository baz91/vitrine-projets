<template>
  <div 
    v-if="showModal" 
    class="demo-modal-overlay"
    @click.self="closeModal"
    @keydown="handleKeyDown"
  >
    <div class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref="modalRoot">
      <!-- Header -->
      <div class="modal-header">
        <div class="modal-title" id="modal-title">
          <span class="icon">💻</span>
          Démo Projet
        </div>
        <button class="close-button" @click="closeModal" aria-label="Fermer">
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="modal-content">
        <p class="description">
          Ce site est une <strong>démonstration technique</strong> réalisée avec :
        </p>

        <div class="tech-list">
          <div class="tech-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/960px-Vue.js_Logo_2.svg.png" alt="Vue.js" class="tech-logo">
            Vue.js 3
          </div>
          <div class="tech-item">
            <img src="https://pinia.vuejs.org/logo.svg" alt="Pinia" class="tech-logo">
            Pinia
          </div>
          <div class="tech-item">
            <img src="https://swiperjs.com/images/swiper-logo.svg" alt="Swiper JS" class="tech-logo">
            Swiper JS
          </div>
          <div class="tech-item">
            <img src="https://vuetifyjs.com/favicon.ico" alt="Vuetify" class="tech-logo">
            Vuetify
          </div>
        </div>

        <div class="author-section">
          <strong>Basile Chevalier</strong><br>
          <span>Développeur Web Front-End</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <label class="dont-show-again">
          <input type="checkbox" v-model="dontShowAgain" />
          Ne plus voir cette fenêtre
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useScrollLock } from '../../utils/scrollLock'
import { focusService } from '../../services/focus.service'

const { lockScroll, unlockScroll } = useScrollLock()

const showModal = ref(false)
const dontShowAgain = ref(false)
const modalRoot = ref(null)

let originalAutoplay = true

const STORAGE_KEY = 'demoModalHidden'
const STORAGE_DURATION = 24 * 60 * 60 * 1000

const isModalHidden = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return false
  try {
    const { timestamp } = JSON.parse(data)
    return Date.now() - timestamp < STORAGE_DURATION
  } catch {
    return false
  }
}

const saveModalPreference = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }))
}

// Swiper Autoplay
const disableSwiperAutoplay = () => {
  const swiper = document.querySelector('.project-swiper')?.swiper
  if (swiper?.autoplay) {
    originalAutoplay = swiper.autoplay.running
    swiper.autoplay.stop()
  }
}

const restoreSwiperAutoplay = () => {
  const swiper = document.querySelector('.project-swiper')?.swiper
  if (swiper?.autoplay && originalAutoplay) {
    swiper.autoplay.start()
  }
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') closeModal()
}

const closeModal = () => {
  if (dontShowAgain.value) saveModalPreference()

  showModal.value = false
  unlockScroll()
  restoreSwiperAutoplay()
  focusService.disableFocusTrap()
  focusService.focusFirstInteractive()
}

watch(showModal, async (isOpen) => {
  if (!isOpen) return

  await nextTick()

  if (modalRoot.value) {
    focusService.enableFocusTrap(modalRoot.value)
    focusService.safeFocusFirst()
  }
    disableSwiperAutoplay()
})

onMounted( () => {
  if (isModalHidden()) return
  showModal.value = true
  lockScroll()
})

onBeforeUnmount(() => {
  unlockScroll()
  restoreSwiperAutoplay()
})
</script>

<style scoped>
/* Styles identiques à la version précédente, déjà harmonisés avec --color-primary / --color-secondary */
.demo-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.4s ease;
}

.demo-modal {
  background: var(--color-secondary);
  color: var(--color-primary);
  max-width: 460px;
  width: 92%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  animation: modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: var(--color-primary);
  color: var(--color-secondary);
}

.modal-title {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.close-button {
  background: none;
  border: none;
  color: var(--color-secondary);
  font-size: 26px;
  cursor: pointer;
  transition: transform 0.3s;
  opacity: 0.8;
}

.close-button:hover {
  color: var(--color-secondary);
  transform: rotate(90deg);
  opacity: 1;
}

.modal-content {
  padding: 32px 28px;
  text-align: center;
}

.description {
  font-size: 1.08rem;
  line-height: 1.5;
  margin-bottom: 24px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.08);
  color: var(--color-primary);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 0.95rem;
  border: 1px solid rgba(255,255,255,0.15);
}

.tech-logo {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

/* Footer */
.modal-footer {
  padding: 16px 24px 28px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.15);
}

.dont-show-again {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--color-primary);
  cursor: pointer;
}

.dont-show-again input {
  accent-color: var(--color-primary);
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalPop {
  from { opacity: 0; transform: scale(0.75) translateY(60px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>