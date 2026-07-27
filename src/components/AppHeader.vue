<template>
  <header class="app-header">
    <button
      class="menu-button"
      type="button"
      aria-label="Open navigation menu"
      @click="$emit('toggle-menu')"
    >
      <span class="icon" :class="{ open }">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <div class="central-component">
      <h1 class="title">Ouvertures</h1>
      <span>{{ openingName }}</span>
    </div>

    <!-- Placeholder to balance the grid -->
    <div></div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  openingName: string;
}>();
defineEmits<{
  (e: "toggle-menu"): void;
}>();
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1100;

  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;

  height: var(--header-height);
  padding: 0 1rem;

  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.menu-button {
  justify-self: start;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: var(--color-text);

  font-size: 1.5rem;
  cursor: pointer;
}

.menu-button:hover {
  background-color: var(--color-border);
}

.menu-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.icon {
  position: relative;
  width: 20px;
  height: 16px;
  display: inline-block;
}

/* the 3 bars */
.icon span {
  position: absolute;
  left: 0;

  width: 100%;
  height: 2px;

  background: var(--color-text);
  border-radius: 2px;

  transition:
    transform 0.25s ease,
    opacity 0.2s ease,
    top 0.25s ease;
}

/* top bar */
.icon span:nth-child(1) {
  top: 0;
}

/* middle bar */
.icon span:nth-child(2) {
  top: 7px;
}

/* bottom bar */
.icon span:nth-child(3) {
  top: 14px;
}

.icon.open span:nth-child(1) {
  top: 7px;
  transform: rotate(45deg);
}

.icon.open span:nth-child(2) {
  opacity: 0;
}

.icon.open span:nth-child(3) {
  top: 7px;
  transform: rotate(-45deg);
}

.central-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.central-component span {
  text-align: center;
}

.title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}
</style>
