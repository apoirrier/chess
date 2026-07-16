<template>
  <div class="feedback">
    <div v-if="feedback.message != undefined" class="bubble">
      <span>{{ feedback.message }}</span>

      <button
        v-if="feedback.action"
        @click="feedback.action.callback"
      >
        {{ feedback.action.label }}
      </button>
    </div>

    <div class="status" :style="statusStyle" @click="onStatusClicked">
      <div class="status-icon">{{ icon }}</div>
      <div class="status-text">
        <h3>{{ title }}</h3>
        <span v-if="secondary != undefined">{{ secondary }}</span>
      </div>
    </div>

    <img
      class="coach"
      src="@/assets/abra.png"
      alt="Coach"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Feedback } from '@/models/Feedback'

const props = defineProps<{
  feedback: Feedback
}>()

const emit = defineEmits<{
  (e: "click"): void
}>()

const icon = computed(() => {
  switch (props.feedback.type) {
    case 'success':
      return '✓'
    case 'idle':
      return '♚'
    case 'nobest':
    case 'error':
    case 'end':
      return '⟲'
    default:
      return '💡'
  }
})

const title = computed(() => {
  switch (props.feedback.type) {
    case 'success':
      return 'Bon coup!'
    case 'idle':
      return 'À votre tour'
    case 'nobest':
    case 'error':
      return 'Réessayer'
    case 'end':
      return 'Jouez à nouveau'
    default:
      return ''
  }
})

const statusStyle = computed(() => {
  switch (props.feedback.type) {
    case 'success':
    case 'nobest':
      return 'background-color: green;'
    case 'error':
      return 'background-color: darkred;'
    case 'end':
      return 'background-color: blue;'
    default:
      return ''
  }
})

const secondary = computed(() => {
  if(props.feedback.type === 'success' && props.feedback.message !== undefined) {
    return 'Suivant'
  }
  return undefined
})

const isButton = computed(() => {
  if(props.feedback.type === 'success' && props.feedback.message !== undefined)
    return true
  if(props.feedback.type === 'nobest')
    return true
  if(props.feedback.type === 'error')
    return true
  if(props.feedback.type === 'end')
    return true
  return false
})

function onStatusClicked() {
  if(isButton.value) {
    emit("click")
  }
}
</script>

<style scoped>
.feedback {
  display: grid;
  grid-template-columns: 1fr 120px;
  grid-template-areas:
    "bubble bubble"
    "status coach";
  gap: 1rem;
}

.bubble {
  max-width: 360px;


  grid-area: bubble;
  align-self: start;

  position: relative;

  padding: 1rem;

  border-radius: 18px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

/* Bubble tail */
.bubble::after {
  content: "";

  position: absolute;

  right: 50px;
  bottom: -12px;

  width: 18px;
  height: 18px;

  background: inherit;

  border-right: inherit;
  border-bottom: inherit;

  transform: rotate(45deg);
}

.status {
  grid-area: status;
  width: 100%;

  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  gap: 1rem;

  padding: 1rem;
  border-radius: 12px;

  user-select: none;

  /* Vendor prefixes for older browsers */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.status-icon {
  width: 56px;
  height: 56px;

  display: grid;
  place-items: center;

  font-size: 2.5rem;
}

.status-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-text h3 {
  margin: 0;
  line-height: 1.2;
}

.status-text p {
  margin: 0.25rem 0 0;
}

.coach {
  grid-area: coach;
  justify-self: end;
  align-self: end;

  width: 100%;
  max-width: 120px;

  margin-top: -10px;
}
</style>
