import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHRoayYAyquEkAxAMIBOYuALmJuQDuiUAAdUsYj2KpSIkAA9EAJgDMADgrqArKo3qAbMoAse5QE5tAGhABPRKuXKKFgIzbjygOzHzGgAxeAL5BNtRYeERklOG0DEysACJgADZgfPLiktKy8koIBubGFNrKrub+prraBl5eNvYIxtoU5l5+5a6q5gYGxv6qIWHoEQQk5BTxEGRQmLEsGBNkAG6oANYxIzhj0ZOM06SzsQgrqPi8MqQA2v4AupkSUpd5iAC0rl4UfcbG6qragXUyn83gabz6WgMGmMH3+zQ86iGIHC2yiEymMzmI1gLDAHA4qA4FFEKV4ADNCdgqFtIuNKBjDliaCdSKtzjlrncHtlnkhFG8TP4KB9XPCBnptF4-mCENpNOp+m0Pk5tLo9MYkSjabtONxpIyhJgeCMKABlQioQSYikcbCYMiiACuPBYADFKfbSE6eJgiLhDpBuU9cnz8q8ARQYUZDFLtKL-OpXDLtEUXP81OoKoEDOpEaFkTSdhNdRcDWBBEaTebLdaPQ7nSxTY6AEbYKRBjkvBDKdSfFW+cqedyqVwGGW-T7qEH+FNOLw1cWawtoygl-WzQ3GjBm3DLTFb1ALWSUU4bakYVF0ihrzGbqu7-cjFlsi6yG73PlZYNyUMOVSfEUEyMLxHDqPoZXeNQKFUSpXC6CwFTlcxlCXC9tWLLhSw3ctK23U0H0ZA9cXxQliVJHgbSpLUi1XTD1wEHCDx3PdCKfU52Uud8O15UB8hggw0wGIFR1VVwBhlAwugoEDSn6Speh0YJ82olcKGSNJ6KIxYT1ZdZNjQmi1NSdJHwwZ8zlfTkPzER5O1-Jp5xKVUYP8PpalqZRrDsN5R0+RwezaEdul6bRUNGVT1JM1iMGIgkiRJclKXPcKr0izS2N0ji3y5T9bJ4-kEC8fxzGk7oRQVAwBjgmVvE0ON-FHUwQKKRMDDCy9djS0ysDxOLWFNUQwEgTBHVEbiQ14xBmhKmFXETUde1qdwZUHLQYVMCU5TgjR2vQyguuinqSK4CAWAUWAeF4ShcDJPgOAACk8-x-AAShYFTUuM9KL16wlA1ynkJoKkcSsTTzcxgyUPBqGq6goICKksBbYzapFSHQOB5A+3ZYnofZ-pswGf0mhA5uKKEtrKYEoQsLzGjmzRVHWxwNCCnpdsMhkjmxcbiYK14TEnKVfh0Rxei6dQIPKEqU1FYwQNFUc1A1ZTlyvLncIkTBfpO3muwFqFSue5pAgBYwDDpxAGeg9blF6cwunMdnVYM1SbzLCsmOrK1GUoz1vT1+zJRKP5HFDooLEsYxx0TaDp0lbxfCldwObdujb0Y+8WNmA9A5J-pnHKSVmkzWMdHHC34Z8Uc2jqVxvElVOr3d7DPZGPP+Z8SMlZjHR40TGVumcQIYSepmnBhUKXZSzqvu6jv8kKTRainXNvm8C2pZMNNVHcuD658Vym9njTuu146CZAL87JJoxVBKMpcynJ2+nE7zSd+LRgUjqcfnNntj7kAXgKXsRtKgAnnPJS2CABZeGcLLE2hQZz6FRiEIAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        // events: {} as
        //   | { type: "Todos loaded"; todos: string[] }
        //   | { type: "Loading todos failed"; errorMessage: string },
        events: {} as
          | { type: "Create new" }
          | { type: "Form input changed"; value: string }
          | { type: "Submit" }
          | { type: "Delete"; todo: string }
          | { type: "Speed up" },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
      },
      id: "Todo machine",
      initial: "Loading Todos",
      states: {
        "Todos Loaded": {
          on: {
            "Create new": {
              target: "Creating new todo",
            },
            Delete: {
              target: "Deleting todo",
            },
          },
        },
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                actions: "assignTodosToContext",
                cond: "Has todos",
                target: "Todos Loaded",
              },
              {
                target: "Creating new todo",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Loading todos errored",
              },
            ],
          },
        },
        "Loading todos errored": {},
        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
                Submit: {
                  target: "Saving todo",
                },
              },
            },
            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#Todo machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Showing form input",
                  },
                ],
              },
            },
          },
        },
        "Deleting todo": {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Deleting todo errored",
              },
            ],
          },
        },
        "Deleting todo errored": {
          after: {
            "2500": {
              target: "Todos Loaded",
            },
          },
          on: {
            "Speed up": {
              target: "Todos Loaded",
            },
          },
        },
      },
    },
    {
      guards: {
        "Has todos": (context, event) => {
          return event.data.length > 0;
        },
      },
      actions: {
        // consoleLogTodos: (context, event) => {
        //   alert(JSON.stringify(event.todos));
        // },
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
      },
    }
  );
