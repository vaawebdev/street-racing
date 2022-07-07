import { Application } from "pixi.js";
import useKeyboardState from "./hooks/useKeyboardState";
import { Nitro } from "./objects/Nitro";
import { Player } from "./objects/Player";
import { Road } from "./objects/Road";
import { Score } from "./objects/Score";
import { Wind } from "./objects/Wind";
import { AppObject, Context, View } from "./types";

export class App {
  private _app: Application | null = null;

  public run(el: HTMLElement): void {
    const objects: AppObject[] = [
      new Road(),
      new Player(),
      new Score(),
      new Wind(),
      new Nitro(),
    ];

    const app = new Application({ resizeTo: el, backgroundColor: 0x666666 });

    const view: Partial<View> = { app };

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj.register) {
        obj.register(app, view);
      }
    }

    const input = useKeyboardState();

    const cxt: Context = {
      // @ts-ignore
      view,
      state: {
        player: {
          speed: 0,
          score: 0,
          position: 0,
        },
        input: input.value,
      },
    };

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj.boot) {
        obj.boot(cxt);
      }
    }

    app.ticker.maxFPS = 90;

    app.ticker.add((delta) => {
      cxt.state.input = input.value;
      cxt.view.delta = delta;

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
