import { Application, Sprite, Text, TilingSprite } from "pixi.js";

export interface View {
  app: Application;
  delta: number;
  road: TilingSprite;
  score: Text;
  player: Sprite;
}

export interface PlayerState {
  speed: number;
  score: number;
  position: number;
}

export interface InputState {
  direction: [number, number];
  nitro: boolean;
}

export interface State {
  player: PlayerState;
  input: InputState;
}

export interface Context {
  view: View;
  state: State;
}

export interface AppObject {
  register?(app: Application, view: Partial<View>): void;
  boot?(cxt: Context): void;
  tick(cxt: Context): void;
}
