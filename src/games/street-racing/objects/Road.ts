import { Application, Texture, TilingSprite } from "pixi.js";
import { AppObject, Context, View } from "../types";

export class Road implements AppObject {
  register(app: Application, view: Partial<View>): void {
    const texture = Texture.from("/road.png");
    const road = new TilingSprite(texture);

    view.road = road;
    app.stage.addChild(road);
  }

  tick(cxt: Context): void {
    const { app, road } = cxt.view;

    road.x = app.view.width / 2 - road.width / 2;
    road.tilePosition.y += cxt.state.player.speed;
    road.height = app.view.height;
    road.width = road.texture.width;
  }
}
