import { onKeyStroke, onKeyUp, useTimeoutFn } from "@vueuse/core";
import { Application, Sprite } from "pixi.js";
import { AppObject, Context, View } from "./types";

export class Player implements AppObject {
  register(app: Application, view: Partial<View>): void {
    const player = Sprite.from("/player_car.png");
    player.anchor.set(0.5, 0.5);

    view.player = player;
    app.stage.addChild(player);
  }

  boot({ state, view }: Context): void {
    const start = useTimeoutFn(
      () => {
        if (start.isPending) {
          start.stop();
        }

        if (state.player.speed < 25) {
          state.player.speed = state.player.speed + 1;
          start.start();
        }
      },
      0,
      { immediate: false }
    );

    const ride = useTimeoutFn(
      () => {
        if (ride.isPending) {
          ride.stop();
        }

        if (state.player.speed > 0) {
          state.player.speed = Math.max(0, state.player.speed - 0.02);
          ride.start();
        }
      },
      0,
      { immediate: false }
    );

    const stop = useTimeoutFn(
      () => {
        if (stop.isPending) {
          stop.stop();
        }

        if (state.player.speed > 0) {
          state.player.speed = Math.max(0, state.player.speed - 0.5);
          stop.start();
        }
      },
      0,
      { immediate: false }
    );

    const right = useTimeoutFn(
      () => {
        if (right.isPending) {
          right.stop();
        }

        if (!state.player.speed) {
          return;
        }

        const max = view.road.width / 2 - 180;
        const turn = state.player.speed > 25 ? 9 : 6;
        const move = turn / 2;

        if (state.player.position + move < max) {
          view.player.rotation = 1 / turn;
          state.player.position += move;
          right.start();
        } else {
          view.player.rotation = 0;
        }
      },
      0,
      { immediate: false }
    );

    const left = useTimeoutFn(
      () => {
        if (left.isPending) {
          left.stop();
        }

        if (!state.player.speed) {
          return;
        }

        const max = view.road.width / 2 - 180;
        const turn = state.player.speed > 25 ? 9 : 6;
        const move = turn / 2;

        if (state.player.position - move > -max) {
          view.player.rotation = -1 / turn;
          state.player.position -= move;
          left.start();
        } else {
          view.player.rotation = 0;
        }
      },
      0,
      { immediate: false }
    );

    onKeyStroke(["a", "A", "ArrowLeft"], () => {
      left.start();
      right.stop();
    });

    onKeyUp(["a", "A", "ArrowLeft"], () => {
      left.stop();
      view.player.rotation = 0;
    });

    onKeyStroke(["d", "D", "ArrowRight"], () => {
      left.stop();
      right.start();
    });

    onKeyUp(["d", "D", "ArrowRight"], () => {
      right.stop();
      view.player.rotation = 0;
    });

    onKeyStroke(["w", "W", "ArrowUp"], () => {
      start.start();
      stop.stop();
      ride.stop();
    });

    onKeyUp(["w", "W", "ArrowUp"], () => {
      start.stop();
      ride.start();
    });

    onKeyStroke(["s", "S", "ArrowDown"], () => {
      start.stop();
      stop.start();
      ride.stop();
    });

    onKeyUp(["s", "S", "ArrowDown"], () => {
      start.stop();
      stop.stop();
      ride.start();
    });
  }

  tick({ view, state }: Context): void {
    view.player.y = view.app.renderer.height - view.player.height;
    view.player.x = state.player.position + view.app.view.width / 2;
    view.road.tilePosition.y += state.player.speed;
    state.player.score += state.player.speed / 10000;
  }
}
