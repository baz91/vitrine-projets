<template>
  <div class="home">

<Swiper
  :modules="modules"
  :loop="true"
  :speed="700"
  :parallax="true"
  :threshold="3"
  :long-swipes-ratio="0.1"
  @swiper="onSwiper"
  @slideChange="onSlideChange"
  @autoplayTimeLeft="onAutoplayTimeLeft"
  class="project-swiper"
  :keyboard="{
    enabled: true,
    onlyInViewport: true
  }"
  :autoplay="{
  delay: 10000,
  disableOnInteraction: false
}"
>

<SwiperSlide
  v-for="(project, i) in projects"
  :key="project.id"
>
        <div class="slide">

          <!-- Background parallax -->
          <div
            class="bg"
            :style="{ backgroundImage: `url(${project.image})` }"
            data-swiper-parallax="30%"
          />

          <!-- Overlay -->
          <div class="overlay" />

          <!-- Content -->
          <div class="content">

            <h1
              class="title"
              data-swiper-parallax="-200"
            >
              {{ project.title }}
            </h1>

            <p
              class="quote"
              data-swiper-parallax="-150"
            >
              “{{ project.quote }}”
            </p>

<router-link
  :to="`/`"
  class="btn"
  :tabindex="i === activeIndex ? 0 : -1"
  data-swiper-parallax="-100"
>
  <!-- route definitive :to="`/project/${project.slug}` -->
  Voir le projet
</router-link>

          </div>

        </div>
      </SwiperSlide>

    </Swiper>
    <!-- NAVIGATION FLÈCHES -->
<div class="nav">

  <button class="nav-btn left" @click="goPrev">
    ‹
  </button>

  <button class="nav-btn right" @click="goNext">
    ›
  </button>

  <!-- INDICATEUR -->
<div class="indicator">

  <div class="counter">
    {{ String(activeIndex + 1).padStart(2, '0') }}
    /
    {{ String(projects.length).padStart(2, '0') }}
  </div>

<div class="dots">
  <button
    v-for="(p, i) in projects"
    :key="p.id"
    :class="['dot', { active: i === activeIndex }]"
    @click="goToSlide(i)"
    :aria-label="`Aller au projet ${i + 1}`"
  />
</div>

</div>

</div>

<!-- PROGRESS BAR -->
<div class="progress-wrapper">

  <div
    class="progress-bar"
    :style="{
      transform: `scaleX(${progress})`
    }"
  />

</div>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '../stores/project.store'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Parallax, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import { extractColorsFromImage } from '../services/color.service'

import 'swiper/css'

const modules = [Parallax, Mousewheel, Keyboard, Autoplay]

const progress = ref(0)

const store = useProjectStore()
const projects = computed(() => store.projects)

const swiperInstance = ref(null)
const activeIndex = ref(0)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex
  applyColors(swiper.realIndex)
}

const goNext = () => swiperInstance.value?.slideNext()
const goPrev = () => swiperInstance.value?.slidePrev()

const goToSlide = (index) => {
  swiperInstance.value?.slideToLoop(index)
}

const applyColors = async (index) => {
  const project = projects.value[index]
  if (!project?.image) return

  const { primary, secondary } = await extractColorsFromImage(project.image)

  document.documentElement.style.setProperty('--color-primary', primary)
  document.documentElement.style.setProperty('--color-secondary', secondary)
}

onMounted(() => {
  applyColors(0)
})

const onAutoplayTimeLeft = (swiper, time, percentage) => {
  progress.value = 1 - percentage
}

</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
  overflow: hidden;

  background-color: var(--color-secondary);
  transition: background-color 0.6s ease;
}

/* ========================= */
/* SWIPER */
/* ========================= */

.project-swiper {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* ========================= */
/* SLIDE */
/* ========================= */

.slide {
  height: 100%;
  width: 100%;

  position: relative;

  overflow: hidden;
}

/* BACKGROUND */
.bg {
  position: absolute;
  inset: 0;
  z-index: 1;

  background-size: cover;
  background-position: center;

  transform: scale(1.1);
  will-change: transform;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  z-index: 2;

  background: var(--color-secondary);
  opacity: 0.35;

  transition: background 0.6s ease, opacity 0.6s ease;
}

/* ========================= */
/* LEFT CONTENT (EDITORIAL TOP LEFT) */
/* ========================= */

.content {
  position: absolute;
  top: 90px;
  left: 24px;

  z-index: 10;

  max-width: 320px;

  color: var(--color-primary);

  text-align: left;
}

.title {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;

  color: white;

  display: inline-block;

}

.quote {
  margin-top: 10px;

  font-size: 14px;
  line-height: 1.4;

  color: var(--color-secondary);

  display: inline-block;

  padding: 8px 12px;

  background: var(--color-primary);
  backdrop-filter: blur(6px);

  border-radius: 0px;

  max-width: fit-content;
}

/* BUTTON */
.btn {
  display: inline-block;

  margin-top: 14px;
  padding: 8px 14px;

  font-size: 12px;

  border: 1px solid var(--color-primary);

  color: white;

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);

  border-radius: 6px;

  transition: 0.3s ease;
}
.btn:hover {
  background: var(--color-primary);
  color: var(--color-secondary);
}

/* ========================= */
/* RIGHT CONTENT (PARAGRAPH OVERLAY) */
/* ========================= */

.paragraph {
  position: absolute;
  top: 120px;
  right: 60px;

  max-width: 300px;

  color: var(--color-primary);

  font-size: 13px;
  line-height: 1.5;

  padding: 14px 16px;

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);

  border-radius: 10px;
}

.paragraph p {
  margin-bottom: 12px;
}

/* ========================= */
/* NAVIGATION (FLÈCHES PLUS BAS + PLUS DISCRETES) */
/* ========================= */

.nav {
  position: absolute;
  inset: 0;

  z-index: 50;

  pointer-events: none;
}

.nav-btn {
  position: absolute;
  bottom: 70px; /* déplacé vers le bas */
  top: auto;

  width: 38px;  /* réduit */
  height: 38px;

  border-radius: 999px;

  border: 1px solid var(--color-primary);

  color: var(--color-primary);
  background: var(--color-secondary);

  font-size: 18px;

  cursor: pointer;
  pointer-events: auto;

  backdrop-filter: blur(10px);

  transition: 0.3s ease;
}

.nav-btn:hover {
  background: var(--color-primary);
  color: var(--color-secondary);
}

.nav-btn.left {
  left: 40px;
}

.nav-btn.right {
  right: 40px;
}

/* ========================= */
/* INDICATOR */
/* ========================= */

.indicator {
  pointer-events: none;

  position: absolute;
  bottom: 24px;
  left: 50%;

  transform: translateX(-50%);

  z-index: 50;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--color-primary);
}

/* COUNTER */
.counter {
  margin-bottom: 10px;

  font-size: 12px;
  letter-spacing: 2px;

  opacity: 0.9;
}

/* DOTS */
.dots {
  pointer-events: auto;

  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 7px;
  height: 7px;

  border-radius: 999px;

  border: 1px solid var(--color-primary);

  background: transparent;

  cursor: pointer;

  transition: 0.3s ease;
}

.dot:hover {
  background: var(--color-primary);
}

.dot.active {
  background: var(--color-primary);
  transform: scale(1.4);
}

/* ========================= */
/* AUTOPLAY PROGRESS BAR */
/* ========================= */

.progress-wrapper {
  position: absolute;

  left: 0;
  bottom: 0;

  width: 100%;
  height: 3px;

  z-index: 100;

  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;

  background: var(--color-primary);

  transform-origin: left center;

  will-change: transform;

  transition: transform 0.05s linear;

  opacity: 1;
}
</style>
