<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="backdrop"
      @click="$emit('close')"
    />

    <aside 
      class="drawer"
      :class="{ open }"
    >
      <nav class="menu">
        <RouterLink to="/" class="menu-item"
                    @click="$emit('close')">Entraînement</RouterLink>
      </nav>

      <div class="bottom">
        <!-- Theme button goes here -->
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.drawer {
  position: fixed;
  top: var(--header-height);
  left: -280px;

  width: 280px;
  height: calc(100vh - var(--header-height));

  display: flex;
  flex-direction: column;

  background: var(--color-surface);

  transition: left .25s ease;

  z-index: 1000;
}

.drawer.open {
  left: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: .75rem;
}

.menu-item {
  display: flex;
  align-items: center;

  padding: 0.75rem 1rem;

  border-radius: 10px;

  text-decoration: none;
  color: var(--color-text);

  font-weight: 500;

  transition: background 0.15s ease, transform 0.1s ease;
}

/* hover (desktop) */
.menu-item:hover {
  background: var(--color-surface);
}

/* press feedback (mobile feel) */
.menu-item:active {
  transform: scale(0.98);
}

/* active route highlight */
.menu-item.router-link-active {
  background: var(--color-surface);
  font-weight: 600;
}

.bottom {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.backdrop {
  position: fixed;
  inset: 0;

  background: rgb(0 0 0 / 40%);

  z-index: 999;
}
</style>
