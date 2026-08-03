<template>Logging in...</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { finishLogin } from "@/auth/auth";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  try {
    const user = await finishLogin();

    const target = user.state?.target ?? "/";

    await router.replace(target);
  } catch (err) {
    console.error("Login failed:", err);
  }
});
</script>
