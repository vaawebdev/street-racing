<template>
  <div ref="container" style="width: 100%; height: 100vh; overflow: hidden" />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { App } from "./games/street-racing/App";

const container = ref<HTMLDivElement>();

const game = ref(new App());

onMounted(() => {
  if (!container.value) {
    return;
  }

  game.value.run(container.value);
});

onBeforeMount(() => {
  game.value.destroy();
});
</script>
