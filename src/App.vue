<template>
  <AppHeader :open="menuOpen" @toggle-menu="menuOpen = !menuOpen" :opening-name="openingName" />

  <AppMenu :open="menuOpen" @close="menuOpen = false" />

  <RouterView />
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppMenu from "@/components/AppMenu.vue";

const menuOpen = ref<boolean>(false);
const openingName = ref<string>("");
provide("openingName", openingName);
</script>
