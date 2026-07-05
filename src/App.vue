<template>
  <AppHeader :open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />

  <AppMenu :open="menuOpen" @close="menuOpen = false" />

  <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppMenu from '@/components/AppMenu.vue'

const menuOpen = ref(false)
</script>
