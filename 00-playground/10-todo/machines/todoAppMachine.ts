import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHRoayYAyquEkAxAMIBOYuALmJuQDuiUAAdUsYj2KpSIkAA9EARgCcAVgoAWABzqdABgDMBgEzr1p5coA0IAJ4qDOiqtUA2dQHYNB93+stAF8gu2osPCIySnDaBiZWABEwABswPnlxSWlZeSUEIw0KC0srUy8TEws7RwRlA019A3qPby0jZU8QsPQIghJyCniIMihMWJYMQbIAN1QAaxjenH7oocYR0jHYhFnUfF4ZUgBtAwBdTIkpI-lagFodZWKDVR1dV6N-Ax87fOUjVwNdw+HSGIxGfTA7ogcIrKKDYajca9WAsMAcDioDgUUQpXgAMyx2Coy0iA0oiK2yJou1IcwOORO50u2RuSEUKgBqiBILBEJ0wJqiDuylMqmer3eOk+Bmc0NhZLWnG40ipQkwPF6FAAyoRUIIkYSONhMGRRABXHgsABiRNNpAtPEwRFwW0gLOuuXZ+Tu6gM2k6pgFXj0yi0zlsDkQ6lUWgopghCZ03O+7lB8tJq0GysOarAgg1Wt1+sNdrNlpY2vNACNsFIPYy8ogg154+YtKo1ForOoOu4hQhdK3DKYGqpTOV1P5wRmMHDyRQc6qxurNRgdbgZki16hJrJKHtFiS54rs1xcyv84X19rN9verT6YdZKcLuysp65N7EEYdKYKN8zReMYIYJmGXgDgCBgdj445aMoXjhjoXjKLOfTwpQS5IquRZ3lSO5ohiWI4niPBGsSCpZph57LgIV47huW74Q+ewMkcr4NmyoD5CY7jxpUf6dBY9RGAO7j-BQFSWOG0HuGm3hofOazJGktEEeimLYriBJEse6ELip6T3hgj77M+TJvmIVyNt+CDAeKFSdihbzTtYA7lC46j1J07SObonSKaelCGWpvR7tMdILEsJ5URQIXGagplsS+zLvtZXEcggfr-ghWjuEYE7JoUnZaAOdwdhKbxaNVXlyR2IShCApDoHA8iURhelxBs7ppayXrcSoyguChagVMmliih4kHiloPgdKYs2WKUgWxZS2wopx-WZXco5PK844FdKqiFN8ZWPJVUoyt8qgrR1a3XhImAaViPVWX1X4DQgO3lBQ7gHTGYqWHoolRnUEnju43Z-t2spDbdC5YXmBYMcWBpUuR9qOptH2Zd4xTSod4KxmKGilaD-kUCYo7eOUMGPOo8NKjR2H0bhTFjDu2NNoOZgUGobT6KoIb6OoA55Zo3zwX9Xgy6KXgKY17UI8zSMPVztl3IhAbuEGwKhkhka1IU-6S12EP7cEiuZh18XMRg6ufSLrhaL2SF5Z8KEDsoFgUI8wIxp24k60YjODLbHPLM9XAQA7mVpi44mdP41UvGoqiQUYrajhC-i9sm-w3VbMUYbHPrmE8f0JgDGhBr2ZWjv+fqSqYab1G0OgNUEQA */
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
          | { type: "Delete"; todo: string },
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
                target: "Todos Loaded",
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
            onError: [
              {
                target: "Deleting todo errored",
                actions: "assignErrorToContext",
              },
            ],
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
          },
        },
        "Deleting todo errored": {},
      },
    },
    {
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
