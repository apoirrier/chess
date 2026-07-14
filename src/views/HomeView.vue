<template>
  <main class="home">
    <ChessBoard
      v-if="playerColor"
      :playerColor="playerColor"
      @board-created="onBoardCreated"
      @move="onMove"
    />

    <MoveFeedback :feedback=feedback @click="onFeedbackClicked" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChessBoard from '@/components/ChessBoard.vue'
import MoveFeedback from '@/components/MoveFeedback.vue'
import { createGame, startGame, playComputer, evaluatePlayerMove } from '@/services/Game'
import type { Feedback } from '@/models/Feedback'
import type { PlayerColor } from '@/models/Game'
import type { BoardApi, MoveEvent } from 'vue3-chessboard'

const boardApi = ref<BoardApi | null>(null)

const playerColor = ref<PlayerColor | null>(null)

const idleFeedback: Feedback = {
  type: 'idle',
  message: 'Choisissez un coup candidat.',
}

const feedback = ref<Feedback>(idleFeedback)

function onBoardCreated(api : BoardApi) {
  boardApi.value = api
  startGame(boardApi.value, playerColor.value)
}

onMounted(async () => {
  playerColor.value = await createGame()
})

function onMove(move : MoveEvent) {
  if(move.color !== playerColor.value[0]) {
    feedback.value = idleFeedback
    return
  }
  feedback.value = evaluatePlayerMove(move.before, move.san)
  if(feedback.value.type === 'success' && feedback.value.message === undefined) {
    setTimeout(() => {
      playComputer(boardApi.value)
    }, 500)
  }
}

function onFeedbackClicked() {
  if(feedback.value.type === 'success') {
    playComputer(boardApi.value)
  } else {
    boardApi.value.undoLastMove()
    feedback.value = idleFeedback
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
