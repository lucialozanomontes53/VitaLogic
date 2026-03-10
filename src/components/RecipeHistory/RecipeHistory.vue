<script setup lang="ts">
import RecipeCard from '../RecipeCard/RecipeCard.vue'
import './RecipeHistory.css'
</script>

<template>
  <section class="history-container">
    <div class="history-header">
      <h2 class="history-title">Historial de recetas</h2>
      <span class="history-add-icon">+</span>
    </div>

    <div class="history-grid">
      <RecipeCard v-for="n in 4" :key="n" />
    </div>
  </section>
</template>