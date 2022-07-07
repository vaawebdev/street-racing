import { Application, Sprite } from "pixi.js";
import { AppObject, Context, View } from "../types";

export class Player implements AppObject {
  register(app: Application, view: Partial<View>): void {
    const player = Sprite.from("/player_car.png");
    player.anchor.set(0.5, 0.5);
    player.zIndex = 10;

    view.player = player;
    app.stage.addChild(player);
  }

  tick(cxt: Context): void {
    this.movePlayer(cxt);
    this.updatePlayerScore(cxt);
  }

  private movePlayer({ view, state }: Context) {
    const allowed = view.road.width / 2 - 180;
    const turn = state.player.speed > 20 || state.input.nitro ? 0.1 : 0.4;
    const move = (1 - turn) * 6;
    const { input } = state;

    if (
      input.direction[0] === 1 &&
      state.player.speed > 0 &&
      state.player.position + move < allowed
    ) {
      view.player.rotation = turn;
      state.player.position += move;
    } else if (
      input.direction[0] === -1 &&
      state.player.speed > 0 &&
      state.player.position - move > -allowed
    ) {
      view.player.rotation = -turn;
      state.player.position -= move;
    } else {
      view.player.rotation = 0;
    }

    if (input.direction[1] === 0) {
      state.player.speed = Math.max(0, state.player.speed - 0.02);
    } else if (input.direction[1] === 1) {
      const maxSpeed = 25 * (state.input.nitro ? 3 : 1);
      const accelerate = 0.1 * (state.input.nitro ? 3 : 1);

      if (state.player.speed > maxSpeed) {
        state.player.speed = Math.max(maxSpeed, state.player.speed - 0.02);
      } else {
        state.player.speed = Math.min(
          maxSpeed,
          state.player.speed + accelerate
        );
      }
    } else if (input.direction[1] === -1 && state.player.speed > 0) {
      state.player.speed = Math.max(0, state.player.speed - 0.7);
    }

    view.player.y = view.app.renderer.height - view.player.height * 1.1;
    view.player.x = state.player.position + view.app.view.width / 2;
  }

  private updatePlayerScore({ state }: Context) {
    state.player.score += state.player.speed / 10000;
  }
}
