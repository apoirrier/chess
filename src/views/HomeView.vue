<template>
  <main class="home">
    <ChessBoard />

    <MoveFeedback />
  </main>
</template>

<script setup lang="ts">
import ChessBoard from '@/components/ChessBoard.vue'
import MoveFeedback from '@/components/MoveFeedback.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
