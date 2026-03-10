<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/loginUsers'
import './LoginView.css'

const userName = ref('')
const userPassword = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  if (userName.value.trim()) {
    // We save the name in the store
    userStore.login(userName.value)
    // Redirection to the home page
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <main class="login-container">
    <h1 class="login-app-title">Vitalogic</h1>

    <div class="login-card">
      <div class="mb-6">
        <label for="username" class="login-label">Usuario</label>
        <input
          v-model="userName"
          type="text"
          id="username"
          placeholder="Usuario"
          class="login-input"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="mb-8">
        <label for="password" class="login-label">Contraseña</label>
        <input
          v-model="userPassword"
          type="password"
          id="password"
          placeholder="Contraseña"
          class="login-input"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="login-button-wrapper">
        <button @click="handleLogin" class="login-button">Iniciar sesión</button>
      </div>
    </div>
  </main>
</template>
