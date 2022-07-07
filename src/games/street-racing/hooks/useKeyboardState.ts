import { KeyFilter, onKeyStroke, onKeyUp } from "@vueuse/core";
import { debounce } from "lodash";
import { computed, ComputedRef, ref } from "vue";
import { InputState } from "../types";

const useKeyboardKey = (key: KeyFilter): ComputedRef<boolean> => {
  const state = ref(false);

  onKeyStroke(
    key,
    debounce(() => {
      state.value = true;
    }, 0)
  );

  onKeyUp(
    key,
    debounce(() => {
      state.value = false;
    }, 0)
  );

  return computed(() => state.value);
};

const useKeyboardState = () => {
  const left = useKeyboardKey(["a", "A", "ArrowLeft"]);
  const right = useKeyboardKey(["d", "D", "ArrowRight"]);
  const up = useKeyboardKey(["w", "W", "ArrowUp"]);
  const down = useKeyboardKey(["s", "S", "ArrowDown"]);
  const space = useKeyboardKey((e) => e.code === "Space");

  return computed<InputState>(() => ({
    direction: [
      !left.value && !right.value ? 0 : left.value ? -1 : 1,
      !up.value && !down.value ? 0 : up.value ? 1 : -1,
    ],
    nitro: space.value,
  }));
};

export default useKeyboardState;
