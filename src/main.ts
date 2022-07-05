import * as pixi from "pixi.js";
import { createApp } from "vue";
import App from "./App.vue";

pixi.utils.skipHello();

createApp(App).mount("#app");
