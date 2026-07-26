<template>
  <main class="home">
    <ChessBoard
      v-if="playerColor"
      :playerColor="playerColor"
      @board-created="onBoardCreated"
      @move="onMove"
    />

    <MoveFeedback :feedback="feedback" @click="onFeedbackClicked" />
  </main>
</template>

<script setup lang="ts">
import { inject, type Ref, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ChessBoard from "@/components/ChessBoard.vue";
import MoveFeedback from "@/components/MoveFeedback.vue";
import { createGame, playComputer, evaluatePlayerMove, getOpeningName } from "@/services/Game";
import { type Feedback, idleFeedback, endFeedback } from "@/models/Feedback";
import type { PlayerColor } from "@/models/Game";
import type { BoardApi, MoveEvent } from "vue3-chessboard";

const router = useRouter();

const boardApi = ref<BoardApi | null>(null);

const playerColor = ref<PlayerColor | null>(null);

const feedback = ref<Feedback>(idleFeedback);

const openingName = inject<Ref<string>>("openingName");
const oldOpeningName = ref<string>("");

async function playComputerMove(): Promise<void> {
  if (!boardApi.value) return;
  const fen = boardApi.value.getFen();
  try {
    const [move, message] = await playComputer(fen);
    if (move === "") {
      feedback.value = endFeedback;
    } else {
      boardApi.value.move(move);
      feedback.value = {
        type: "idle",
        message: message === "" ? "Choisissez un coup candidat." : message,
      };
    }
  } catch (err) {
    console.error(err);
  }
}

async function onBoardCreated(api: BoardApi) {
  boardApi.value = api;
  if (playerColor.value === "black") {
    playComputerMove();
  }
}

onMounted(() => {
  playerColor.value = createGame();
});

async function onMove(move: MoveEvent) {
  if (boardApi.value === null) return;
  const newOpeningName = await getOpeningName(boardApi.value.getFen());
  if (openingName && newOpeningName !== "") {
    oldOpeningName.value = openingName.value;
    openingName.value = newOpeningName;
  }

  if (move.color !== (playerColor.value as PlayerColor)[0]) return;
  try {
    feedback.value = await evaluatePlayerMove(move.before, move.san);
    if (feedback.value.type === "success" && feedback.value.message === "") {
      setTimeout(async () => {
        playComputerMove();
      }, 500);
    }
  } catch (err) {
    console.error(err);
  }
}

async function onFeedbackClicked() {
  if (feedback.value.type === "success") {
    playComputerMove();
  } else if (feedback.value.type === "end") {
    router.go(0);
  } else {
    boardApi.value?.undoLastMove();
    feedback.value = idleFeedback;
    if (openingName && boardApi.value) openingName.value = oldOpeningName.value;
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
