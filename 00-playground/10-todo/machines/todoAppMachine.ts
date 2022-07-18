import { createMachine } from "xstate";

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWwEMBjACwEsA7MAOjUy0gGIBZAeQFUBlAUQ4BVEoAA6pYZAC5lUFQSAAeiALQBGABzLqygCzKArOoBsABgBMugMwXVAGhABPRFvPUTqrbpMnzy8wE4zegC+gbZ02PjE5FTUAHKo4jhhDBAsHDysAGrcAEqyImKS0rIKCNpG1L5G5uYA7Lp6qqomNSYGtg4IinXURka+qroWzQa6vjVawSEgFKgQcLJJEaSUNEmQeaISUjJI8og+qtQGI0YGdb6+5qoGl+2I5gbUNW66RrpaBsquWma6waEYcKEZbROIJNYQDYFbbFJQmIwafr+cyuPx+Iw1O6ddTUV79LSqfoPXo1Xz-ECLYFRMBQrZFXYlRSeXQVQleVGXSqY+xKPRaXF9a5qZpaAnVSaBIA */
  createMachine({
    initial: "Not Hovered",
    states: {
      Hovered: {
        on: {
          MOUSEOUT: {
            target: "Not Hovered",
          },
        },
      },
      "Not Hovered": {
        on: {
          MOUSEOVER: {
            target: "Hovered",
          },
        },
      },
    },
    id: "Hover machine",
  });
