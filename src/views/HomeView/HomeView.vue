<script setup lang="ts">
import FamilySelector from '../../components/FamilySelector/FamilySelector.vue'
import RecipeHistory from '../../components/RecipeHistory/RecipeHistory.vue'

const nombreUsuario = 'Lucia' 
const numIngredientes = 12
</script>

<template>
  <main class="min-h-screen bg-white p-6 pb-24 font-sans max-w-md mx-auto overflow-x-hidden">
    
    <h1 class="text-4xl font-bold text-[--color-vital-blue] text-center mt-4 mb-10">
      Vitalogic
    </h1>

    <div class="mb-4">
      <p class="text-2xl font-bold text-[--color-vital-blue]">
        Hola, {{ nombreUsuario }} 👋
      </p>
    </div>

    <button class="w-full bg-vital-dark text-white py-4 rounded-2xl font-bold mb-8 shadow-md active:scale-95 transition-transform">
      Tienes {{ numIngredientes }} ingredientes en casa
    </button>

    <FamilySelector />

    <RecipeHistory />

    <button class="fixed bottom-10 right-8 w-13 h-13 bg-vital-dark rounded-full text-white text-3xl flex items-center justify-center">
      +
    </button>
  </main>
</template>