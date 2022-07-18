import { createMachine } from "xstate";

export const myMachine = createMachine({
  initial: "notHovered",
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: "hovered",
        },
      },
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: "notHovered",
        },
      },
    },
  },
});
