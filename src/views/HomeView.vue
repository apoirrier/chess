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
import { useRouter } from 'vue-router'
import ChessBoard from '@/components/ChessBoard.vue'
import MoveFeedback from '@/components/MoveFeedback.vue'
import { createGame, playComputer, evaluatePlayerMove } from '@/services/Game'
import type { Feedback } from '@/models/Feedback'
import type { PlayerColor } from '@/models/Game'
import type { BoardApi, MoveEvent } from 'vue3-chessboard'

const router = useRouter()

const boardApi = ref<BoardApi | null>(null)

const playerColor = ref<PlayerColor | null>(null)

const idleFeedback: Feedback = {
  type: 'idle',
  message: 'Choisissez un coup candidat.',
}

const endFeedback: Feedback = {
  type: 'end',
  message: 'Fin de l\'entraînement.'
}

const feedback = ref<Feedback>(idleFeedback)

async function playComputerMove(): Promise<void> {
  if(!boardApi.value) return
  const fen = boardApi.value.getFen()
  const move = await playComputer(fen)
  if(move)
    boardApi.value.move(move)
  else
    feedback.value = endFeedback
}

async function onBoardCreated(api : BoardApi) {
  boardApi.value = api
  if(playerColor.value === "black") {
    playComputerMove()
  }
}

onMounted(() => {
  playerColor.value = createGame()
})

async function onMove(move : MoveEvent) {
  if(move.color !== (playerColor.value as PlayerColor)[0]) {
    feedback.value = idleFeedback
    return
  }
  feedback.value = await evaluatePlayerMove(move.before, move.san)
  if(feedback.value.type === 'success' && feedback.value.message === undefined) {
    setTimeout(async () => {
      playComputerMove()
    }, 500)
  }
}

async function onFeedbackClicked() {
  if(feedback.value.type === 'success') {
    playComputerMove()
  } else if(feedback.value.type === 'end') {
    router.go(0)
  } else {
    boardApi.value?.undoLastMove()
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

@media (min-width: 1024px) {
  .home {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
