import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {

  const savedName = localStorage.getItem('vitalogic_user_name')
  
  const name = ref(savedName || '')
  const isAuthenticated = ref(!!savedName)

  watch(name, (newName) => {
    if (newName) {
      localStorage.setItem('vitalogic_user_name', newName)
    } else {
      localStorage.removeItem('vitalogic_user_name')
    }
  })

  function login(userName: string) {
    name.value = userName
    isAuthenticated.value = true
  }

  function logout() {
    name.value = ''
    isAuthenticated.value = false
    localStorage.removeItem('vitalogic_user_name')
  }

  return { name, isAuthenticated, login, logout }
})
