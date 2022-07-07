import { AnimatedSprite, Texture } from "pixi.js";
import { AppObject, Context } from "../types";

export class Nitro implements AppObject {
  private _nitro: AnimatedSprite | null = null;

  boot(cxt: Context): void {
    this._nitro = new AnimatedSprite(
      [
        "/nitro_1.png",
        "/nitro_2.png",
        "/nitro_3.png",
        "/nitro_4.png",
        "/nitro_5.png",
        "/nitro_6.png",
      ].map((p) => Texture.from(p))
    );

    this._nitro.anchor.set(0.5, 0.5);
    this._nitro.rotation = Math.PI;

    cxt.view.app.stage.addChild(this._nitro);
  }

  tick(cxt: Context): void {
    if (!this._nitro) {
      return;
    }

    if (cxt.state.input.nitro && cxt.state.input.direction[1] === 1) {
      const y =
        cxt.view.player.y +
        cxt.view.player.height / 2 +
        this._nitro.texture.height / 2 -
        5 -
        Math.abs(cxt.view.player.rotation * Math.PI * 6) +
        10 * cxt.view.player.rotation;

      const x =
        cxt.view.player.position.x -
        cxt.view.player.rotation * cxt.view.player.width * 1.5 +
        10;

      this._nitro.y = y;
      this._nitro.x = x;

      this._nitro.rotation = cxt.view.player.rotation + Math.PI;

      this._nitro.alpha = 1;

      if (!this._nitro.playing) {
        this._nitro.play();
      }
    } else {
      this._nitro.alpha = 0;

      if (this._nitro.playing) {
        this._nitro.stop();
      }
    }
  }
}
