<script setup lang="ts">
import './FamilySelector.css'
</script>

<template>
  <section class="family-container">
    <h2 class="family-title">
      ¿Para quién cocinamos hoy?
    </h2>
    <div class="family-grid">
      <div 
        v-for="user in ['user1', 'user2', 'user3', 'All']" 
        :key="user" 
        class="user-avatar"
      >
        {{ user }}
      </div>
    </div>
  </section>
</template>