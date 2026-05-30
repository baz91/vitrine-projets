<template>
  <div v-if="showLoading" class="app-loader">
    <div class="loader-content">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script setup>
import { useAppLoader } from '../services/appLoader'

const { showLoading } = useAppLoader()
</script>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  background: var(--color-secondary);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  text-align: center;
  color: var(--color-primary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255,255,255,0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>