import * as pixi from "pixi.js";
import { createApp } from "vue";
import App from "./App.vue";

pixi.utils.skipHello();
pixi.settings.SORTABLE_CHILDREN = true;

createApp(App).mount("#app");
