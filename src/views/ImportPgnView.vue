<template>
  <main class="import-pgn">
    <h1>Import PGN</h1>

    <textarea
      v-model="pgn"
      placeholder="Paste your PGN here..."
      rows="15"
      @focus="feedback = null"
    />

    <div class="actions">
      <span v-if="feedback" :class="feedback.status">
        {{ feedback.message }}
      </span>

      <div class="button" @click="importPgn">Import</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type ImportFeedback, pendingFeedback } from "@/models/ImportFeedback";
import { importPGN } from "@/services/Game";

const pgn = ref("");

const feedback = ref<ImportFeedback | null>(null);

function importPgn() {
  feedback.value = pendingFeedback;

  importPGN(pgn.value).then((returned_feedback) => {
    feedback.value = returned_feedback;
    pgn.value = "";
  });
}
</script>

<style scoped>
.import-pgn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 640px;
  margin: 0 auto;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

textarea {
  width: 100%;
  resize: vertical;
  padding: 1rem;
  font-family: monospace;
}

.button {
  align-self: flex-end;

  width: 100px;

  text-align: center;

  background-color: var(--end-feedback-color);

  padding: 1rem;
  border-radius: 12px;

  user-select: none;

  /* Vendor prefixes for older browsers */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  cursor: pointer;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button:hover {
  filter: brightness(1.1);
}

.success {
  color: var(--good-feedback-color);
}

.error {
  color: var(--bad-feedback-color);
}

.pending {
  color: var(--color-text);
}
</style>
