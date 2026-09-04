<template>
  <main class="home">
    <ChessBoard
      v-if="playerColor"
      :playerColor="playerColor"
      @board-created="onBoardCreated"
      @move="onMove"
    />

    <div class="feedback-and-button">
      <MoveFeedback
        :feedback="feedback"
        @click="onFeedbackClicked"
        @hint="onHintClicked"
        @solution="onSolutionClicked"
      />
      <div class="buttons">
        <a
          class="lichess"
          :href="'https://lichess.org/analysis/' + currentFen"
          about="Copy PGN"
          target="_blank"
        ></a>
        <div class="pgn" @click="onPGNClicked">
          <span>⬇</span>
          <p>Copier PGN</p>
        </div>
        <div v-if="date" class="date" :style="{ color: dateColor }">
          {{ date }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { inject, type Ref, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ChessBoard from "@/components/ChessBoard.vue";
import MoveFeedback from "@/components/MoveFeedback.vue";
import {
  createGame,
  playComputer,
  evaluatePlayerMove,
  getOpeningName,
  endVariation,
} from "@/services/Game";
import { type Feedback, idleFeedback, endFeedback } from "@/models/Feedback";
import type { PlayerColor } from "@/models/Game";
import type { BoardApi, SquareKey, MoveEvent } from "vue3-chessboard";

const router = useRouter();

const boardApi = ref<BoardApi | null>(null);

const playerColor = ref<PlayerColor | null>(null);

const feedback = ref<Feedback>(idleFeedback);

const openingName = inject<Ref<string>>("openingName");
const oldOpeningName = ref<string>("");

const currentFen = ref<string>("");

const errorMade = ref<boolean>(false);

const date = ref<string>("");
const dateColor = ref<string>("var(--color-on-surface)");

async function playComputerMove(): Promise<void> {
  if (!boardApi.value) return;
  const fen = boardApi.value.getFen();
  try {
    const [move, message, dueDate] = await playComputer(fen);
    if (move === "") {
      await endVariation(
        boardApi.value.getPgn(),
        errorMade.value,
        playerColor.value as PlayerColor,
      );
      feedback.value = endFeedback;
    } else {
      boardApi.value.move(move);
      feedback.value = {
        type: "idle",
        message: message === "" ? "Choisissez un coup candidat." : message,
      };
      if (dueDate) {
        const dateObj = new Date(dueDate);
        const today = new Date();
        date.value = dateObj.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });
        today.setHours(0, 0, 0, 0);
        dateObj.setHours(0, 0, 0, 0);
        if (dateObj < today) {
          dateColor.value = "var(--bad-feedback-color)";
        } else if (dateObj > today) {
          dateColor.value = "var(--good-feedback-color)";
        } else {
          dateColor.value = "var(--color-on-surface)";
        }
      } else {
        date.value = "";
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function onBoardCreated(api: BoardApi) {
  boardApi.value = api;
  errorMade.value = false;
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
  currentFen.value = boardApi.value.getFen();

  if (move.color !== (playerColor.value as PlayerColor)[0]) return;
  try {
    feedback.value = await evaluatePlayerMove(move.before, move.san);
    if (feedback.value.type === "success" && feedback.value.message === "") {
      setTimeout(async () => {
        playComputerMove();
      }, 500);
    } else if (feedback.value.type === "error") {
      errorMade.value = true;
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
    if (boardApi.value) {
      boardApi.value?.undoLastMove();
      const oldFeedback = feedback.value;
      feedback.value = idleFeedback;
      if (oldFeedback.type === "error") feedback.value.solution = oldFeedback.solution;
      if (openingName && boardApi.value) openingName.value = oldOpeningName.value;
      currentFen.value = boardApi.value.getFen();
    }
  }
}

async function onHintClicked(solution: string) {
  if (boardApi.value && solution.length >= 2) {
    boardApi.value.setShapes([
      {
        orig: solution.slice(0, 2) as SquareKey,
        dest: solution.slice(0, 2) as SquareKey,
        brush: "green",
      },
    ]);
  }
}

async function onSolutionClicked(solution: string) {
  if (boardApi.value && solution.length >= 4)
    boardApi.value.setShapes([
      {
        orig: solution.slice(0, 2) as SquareKey,
        dest: solution.slice(2, 4) as SquareKey,
        brush: "green",
      },
    ]);
}

async function onPGNClicked() {
  if (!boardApi.value) return;
  const pgn = boardApi.value.getPgn();
  await navigator.clipboard.writeText(pgn);
  window.open("https://lichess.org/paste", "_blank");
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

.feedback-and-button {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.pgn {
  display: flex;
  flex-direction: row;

  height: 50px;
  min-width: 100px;
  border-radius: 10px;
  background-color: var(--color-surface);
  text-align: center;
  padding: 2px;

  cursor: pointer;
  user-select: none;
}

.pgn span {
  font-size: 2rem;
}

.pgn p {
  width: 75px;
  margin-top: 0;
}

.lichess {
  background-image: var(--lichess-button);
  background-size: 50px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.date {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  height: 50px;
  min-width: 60px;
  border-radius: 10px;
  background-color: var(--color-surface);
  text-align: center;
  padding: 2px;
}
</style>
