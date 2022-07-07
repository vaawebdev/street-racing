import { Graphics } from "pixi.js";
import { AppObject, Context } from "../types";

export class Wind implements AppObject {
  private _lines: Graphics[] = [];

  boot(cxt: Context): void {
    const { app, road } = cxt.view;

    for (let i = 0; i < 50; i++) {
      const line = new Graphics();

      line.beginFill(0xffffff);

      line.drawRect(
        Math.floor(Math.random() * app.view.width),
        Math.floor(cxt.view.app.view.height * 2),
        5,
        Math.random() * 100 + 650
      );

      line.endFill();

      line.alpha = 0;
      this._lines.push(line);
      app.stage.addChild(line);
    }
  }

  tick(cxt: Context): void {
    for (let i = 0; i < this._lines.length; i++) {
      const line = this._lines[i];

      if (cxt.state.player.speed > 35) {
        line.alpha = Math.max(0.1, line.alpha + 0.0001);

        if (line.y > cxt.view.app.view.height * 2) {
          line.y = Math.floor(-Math.random() * cxt.view.app.view.height * 6);
          line.x = Math.floor(Math.random() * cxt.view.app.view.width);
        } else {
          line.y += cxt.state.player.speed * 6;
        }
      } else {
        line.alpha = Math.min(0, line.alpha - 0.0001);
      }
    }
  }
}
