import { Application } from "pixi.js";
import { Player } from "./Player";
import { Road } from "./Road";
import { Score } from "./Score";
import { AppObject, Context, State, View } from "./types";

export class App {
  private _app: Application | null = null;

  constructor(private readonly _state: State) {}

  public run(el: HTMLElement): void {
    const objects: AppObject[] = [new Road(), new Player(), new Score()];
    const app = new Application({ resizeTo: el, backgroundColor: 0x666666 });

    const view: Partial<View> = { app };

    for (let i = 0; i < objects.length; i++) {
      objects[i].register(app, view);
    }

    // @ts-ignore
    const cxt: Context = { state: this._state, view };

    for (let i = 0; i < objects.length; i++) {
      objects[i].boot(cxt);
    }

    app.ticker.add(() => {
      for (let i = 0; i < objects.length; i++) {
        objects[i].tick(cxt);
      }
    });

    this._app = app;
    el.appendChild(app.view);
  }

  public destroy(): void {
    this._app?.destroy();
  }
}
