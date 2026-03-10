<script setup lang="ts">
import { useRouter } from 'vue-router'
import FamilySelector from '../../components/FamilySelector/FamilySelector.vue'
import RecipeHistory from '../../components/RecipeHistory/RecipeHistory.vue'
import { useUserStore } from '../../stores/userAuthentification'

import './HomeView.css'

const userStore = useUserStore()
const router = useRouter()
const numIngredientes = 12

const handleLogout = () => {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <main class="home-main-container">
    
    <header class="home-header">
      <h1 class="home-title">Vitalogic</h1>

      <button @click="handleLogout" class="logout-icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
          <line x1="12" y1="2" x2="12" y2="12"></line>
        </svg>
      </button>
    </header>

    <div class="mb-4">
      <p class="welcome-text">Hola, {{ userStore.name }} 👋</p>
    </div>

    <button class="ingredients-banner-btn">
      Tienes {{ numIngredientes }} ingredientes en casa
    </button>

    <FamilySelector />
    <RecipeHistory />

  </main>
</template>