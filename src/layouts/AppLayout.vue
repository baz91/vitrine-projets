<template>
  <!-- Loader -->
  <AppLoader />

  <!-- Contenu principal (affiché seulement quand le chargement est terminé) -->
  <div v-if="!showLoading" class="app-content">
    <AppHeader />

    <main>
      <DemoModal />
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import DemoModal from '../components/layout/DemoModal.vue'
import AppLoader from '../components/AppLoader.vue'
import { useAppLoader } from '../services/appLoader'

const { showLoading } = useAppLoader()
</script>