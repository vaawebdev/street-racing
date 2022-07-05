<template>
  <div ref="container" style="width: 100%; height: 100vh; overflow: hidden" />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { App } from "./games/street-racing/App";
import { State } from "./games/street-racing/types";

const container = ref<HTMLDivElement>();

const state = reactive<State>({
  player: {
    speed: 0,
    score: 0,
    position: 0,
  },
});

const game = ref(new App(state));

// const instance = ref<pixi.Application | null>(null);

// const direction = ref(0);
// const pos = ref(0);
// const score = ref(0);
// const accelerate = ref(false);

// const resetPosition = useTimeoutFn(() => {
//   direction.value = 0;
// }, 0);

// onKeyStroke(["a", "A", "ArrowLeft"], () => {
//   resetPosition.stop();
//   direction.value = -1;
// });

// onKeyStroke(["d", "D", "ArrowRight"], () => {
//   resetPosition.stop();
//   direction.value = 1;
// });

// onKeyStroke(
//   (e) => e.code === "Space",
//   () => {
//     accelerate.value = true;
//   }
// );

// onKeyUp(
//   (e) => e.code === "Space",
//   () => {
//     accelerate.value = false;
//   }
// );

// onKeyUp(["a", "A", "ArrowLeft", "d", "D", "ArrowRight"], () => {
//   resetPosition.start();
// });

onMounted(() => {
  if (!container.value) {
    return;
  }

  game.value.run(container.value);
  // const app = new pixi.Application({ resizeTo: container.value });

  // const roadTexture = pixi.Texture.from("/road.png");
  // const road = new pixi.TilingSprite(roadTexture);

  // const scoreText = new pixi.Text(`Score: ${score.value}`, {
  //   fontFamily: "Arial",
  //   fontSize: 42,
  //   fill: 0xffffff,
  //   dropShadow: true,
  //   dropShadowColor: 0x000000,
  //   dropShadowDistance: 3,
  //   align: "center",
  // });

  // scoreText.y = 15;

  // const playerCar = pixi.Sprite.from("/player_car.png");
  // playerCar.anchor.set(0.5, 0.5);

  // app.stage.addChild(road);
  // app.stage.addChild(playerCar);
  // app.stage.addChild(scoreText);
  // app.renderer.backgroundColor = 0x666666;

  // app.ticker.add((delta) => {
  //   const move = accelerate.value ? delta * 3 : delta * 9;
  //   const maxAllowedPos = road.width / 2 - 180;

  //   if (direction.value === 0) {
  //     playerCar.rotation = 0;
  //   } else if (direction.value === -1 && pos.value - move > -maxAllowedPos) {
  //     playerCar.rotation = -delta / (accelerate.value ? 9 : 3);
  //     pos.value -= move;
  //   } else if (direction.value === 1 && pos.value + move < maxAllowedPos) {
  //     playerCar.rotation = delta / (accelerate.value ? 9 : 3);
  //     pos.value += move;
  //   }

  //   road.x = app.view.width / 2 - road.width / 2;
  //   road.height = app.view.height;
  //   road.width = roadTexture.width;
  //   road.tilePosition.y += accelerate.value ? 25 : 5;

  //   playerCar.y = app.renderer.height - playerCar.height;
  //   playerCar.x = app.view.width / 2 + pos.value;

  //   scoreText.x = app.view.width / 2 - scoreText.width / 2;
  //   score.value += Math.round(accelerate.value ? delta * 5 : delta) / 10000;
  //   scoreText.text = `Score: ${score.value.toFixed(2)}km.`;
  // });

  // instance.value = app;
  // container.value.appendChild(app.view);
});

onBeforeMount(() => {
  game.value.destroy();
});
</script>
