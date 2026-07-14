<template>
  <section class="board-container">
    <TheChessboard
      :board-config="boardConfig"
      :player-color="playerColor"
      reactive-config
      @move="onMove"
      @board-created="onBoardCreated"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PlayerColor } from '@/models/Game'
import { TheChessboard, type BoardConfig, type BoardApi, type MoveEvent } from "vue3-chessboard"
import "vue3-chessboard/style.css"

const props = defineProps<{
  playerColor: PlayerColor
}>()

const emit = defineEmits<{
  (e: "move", move: MoveEvent): void
  (e: "boardCreated", api: BoardApi): void
}>()

const boardConfig = computed<BoardConfig>(() => ({
  orientation: props.playerColor,
  coordinates: true
}))

function onMove(move: moveEvent) {
  emit("move", move)
}

function onBoardCreated(api: BoardApi) {
  emit("boardCreated", api)
}
</script>

<style scoped>
.board-container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  aspect-ratio: 1;
}
</style>
