import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHRoayYAyquEkAxAMIBOYuALmJuQDuiUAAdUsYj2KpSIkAA9EARgCcAVgoAWABzqdABgDMBgEzr1p5coA0IAJ4qDOiqtUA2dQHYNB93+stAF8gu2osPCIySgYmMihMcNgWDHIKMgA3VABrSnCcAhI02Ih4xPQJBEzUfF4ZUgBtAwBdeXFJaVl5RwQAWh1lCnUDVR1dUaN-Ax87JQRlI1cDdXcfHUMjI31VkLCKgqjixlLSBKSWMA4OVA4KUQAbXgAzG+wqfciimOOypKrSLK1TqNFptCRSeryOYLJYrNYbLY6VZ2Hq9ZSmVRDEZjHQTKY6XYgfKfaIUTjcaSnARgQSYHgVCgAZUIqEEZReHGwmDIogArjwWAAxV7c0h8niYIi4U6QMEdSFIRSILQGCimAxaVRGLxedUGZT+dwoxCbLwUIxaUwDVReFbudxuYKhIkfQqk8l1KlCOkM5ms9kinn8liM3kAI2wUjlEK6irm2rNY1WBq0Wi8RmUBmMxoQphMSw8KucFvcyi06kJxLdaQ9lIS3vpGCZuAyZUbqBSsko1Vy7wwBy+ZK4nvrNJ9TcZLbbFX+gLqsiarUV7RjcjjJp0pgo031XmMXk3GbTOcWGptblMWmUXhVOi8ykrrsOlFrZQbvqnVPbFyuNzujx4Dk3irZ8hwpN8x3bZtWy-GdqiBepF2jYEoRNDwKD0A0-FWbDdRPFYMMtTcRjMbZVBCZ1SHQOB5BAwcknoY5ZWXcEUPXeZlBce81HTXFLHRDwT0xNMtXRNNLEsUxH37EkjjiKkkmQhVQDmXp1UGUZVDzK0jC1VRphzfpBmGUZxh0SYsx8aSImrb55ISdtaEua4uAgJTYxUxA1NMM0HTzdQtI0K11CMHNrEWLT3CIy89U46yB3dYc62pWkoL9NkqSA0VxXctdPPmXQ1Q1CwrVTbZzJzUxL20EZ3CMAYTDvLSvHi2SXySiDUo-GCHIqXLUIQTUtwGB09xVExlHULRKucChOOvYY6pMK13AJZ06MS8CvUgvqWPlDylXmdwis1BNYsNUwwq2OaBhvW1rFUdEvHcVrbP69i1PUQY-K2QLLD0UKHC89UtxMsZTFWzNvArCigA */
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
          | { type: "Submit" },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
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
