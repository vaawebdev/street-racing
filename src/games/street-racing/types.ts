import { Application, Sprite, Text, TilingSprite } from "pixi.js";

export interface View {
  app: Application;
  road: TilingSprite;
  score: Text;
  player: Sprite;
}

export interface State {
  player: {
    speed: number;
    score: number;
    position: number;
  };
}

export interface Context {
  view: View;
  state: State;
}

export interface AppObject {
  register(app: Application, view: Partial<View>): void;
  boot(cxt: Context): void;
  tick(cxt: Context): void;
}
