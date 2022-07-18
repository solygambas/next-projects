import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHRoayYAyquEkAxAMIBOYuALmJuQDuiUAAdUsYj2KpSIkAA9EARgCcAVgoAWABzqdABgDMBgEzr1p5coA0IAJ4qDOiqtUA2dQHYNB93+stAF8gu2osPCIySnDaBiZWABEwABswPnlxSWlZeSUEIw0KC0srUy8TEws7RwRlA019A3qPby0jZU8QsPQIghJyCniIMihMWJYMQbIAN1QAaxjenH7oocYR0jHYhFnUfF4ZUgBtAwBdTIkpI-lagFodZWKDVR1dV6N-Ax87fOUjVwNdw+HSGIxGfTA7ogcIrKKDYajca9WAsMAcDioDgUUQpXgAMyx2Coy0iA0oiK2yJou1IcwOORO50u2RuSEUKgBqiBILBEJ0wJqiDuylMqmer3eOk+Bmc0NhZLWnG40ipQkwPF6FAAyoRUIIkYSONhMGRRABXHgsABiRNNpAtPEwRFwW0gLOuuXZ+Tu6gM2k6pgFXj0yi0zlsDkQ6lUWgopghCZ03O+7lB8tJq0GysOarAgg1Wt1+sNdrNlpY2vNACNsFIPYy8ogg154+YtKo1ForOoOu4hQhdK3DKYGqpTOV1P5wRmMHDyRQc6qxurNRgdbgZki16hJrJKHtFiS54rs1xcyv84X19rN9verT6YdZKcLuysp65N7EEYdKYKN8zReMYIYJmGXgDgCBgdj445aMoXjhjoXjKLOfTwpQS5IquRZ3lSO5ohiWI4niPBGsSCpZph57LgIV47huW74Q+ewMkcr4NmyoD5CY7jxpUf6dBY9RGAO7j-BQFSWOG0HuGm3hofOazJGktEEVMB50gsSwnlRFAqek94YI++zPkyb5iFcjbfggfr-ghWjuEYE7JoUnZaAOdwdhKbxaH56idO4HaKaelAGWpvSEZi2K4gSRLHuhC7hUZqAmWxL7Mu+VlcRyCDAeKFSdihbzTtYA7lC4AXNEFRiFbonQhXpyXMXO6LRawCiwDwvCULg+J8BwAAU5iygAlCwlEYfpqSGS1WBtVi7pZayXrcT+agUI85iglUXjqFoU7lV4rbOO43IaJ0yF6O4jVTc1Yw7pgC1cBAlaiGAkCYOaoicatuUHeK8HKI8l1eMCyjqAOXabfB7TghYIO-iEoQgKQ6BwPIk0LrE9AbEtlkrV+a11MDknWKoFTJpYooeJBgM+B0phaHt5gTrdC6UtsKK-UTuV3KOTyvOOznSqohTfJ5jw+VKMrfKo7NrJz14SE9REvTzTYIPz5QUGdCYxmKlh6KJUYk1yphBUGTOjs0OgK2eKrYfRRZ6gaVLkfajoazZ3jFNKIvgrGYoaB5pv1RQJijt45QwY86j29Rjt5gWDG3kxD29N7xPhvZGiIfoFN6HoA6OZo3zwWdx0oZOXgJ4uNFOynmfLZ+mt3IhAbuEGwKhkhka1IU-7l1245ncmwQo1jykzRFGBZ7l+iaLGvZIY5nwoVDFibZ0e1uJ0gZGHX93K6r7UQPP+Rpi44mBdB4adm4kG1fGxhTg0v6doUCcX8K5hPHrEJxwaCDL2Tyo5-x+klIVIMyFULIyAA */
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
