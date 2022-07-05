import { Application, Text } from "pixi.js";
import { AppObject, Context, View } from "./types";

export class Score implements AppObject {
  register(app: Application, view: Partial<View>): void {
    const score = new Text(`Score: 0`, {
      fontFamily: "Arial",
      fontSize: 42,
      fill: 0xffffff,
      dropShadow: true,
      dropShadowColor: 0x000000,
      dropShadowDistance: 3,
      align: "center",
    });

    view.score = score;
    app.stage.addChild(score);
  }

  boot(cxt: Context): void {}

  tick(cxt: Context): void {
    const { app, score } = cxt.view;

    score.y = 15;
    score.x = app.view.width / 2 - score.width / 2;
    score.text = `Score: ${cxt.state.player.score.toFixed(2)}km`;
  }
}
