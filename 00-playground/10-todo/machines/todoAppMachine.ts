import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHRoayYAyquEkAxAMIBOYuALmJuQDuiUAAdUsYj2KpSIkAA9EARgCcAVgoAWABzqdABgDMBgEzr1p5coA0IAJ4qDOiqtUA2dQHYNB93+stAF8gu2osPCIySgYmMihMcNgWDHIKMgA3VABrSnCcAhI02Ih4xPQJBEzUfF4ZUgBtAwBdeXFJaVl5RwQAWh1lCnUDVR1dUaN-Ax87JQRlI1cDdXcfHUMjI31VkLCKgqjixlLSBKSWMA4OVA4KUQAbXgAzG+wqfciimOOypKrSLK1TqNFptCRSeryOYLJYrNYbLY6VZ2Hq9ZSmVRDEZjHQTKY6XYgfKfaIUTjcaSnARgQSYHgVCgAZUIqEEZReHGwmDIogArjwWAAxV7c0h8niYIi4U6QMEdSFIRSILQGCimAxaVRGLxedUGZT+dwoxCbLwUIxaUwDVReFbudxuYKE0joODyYmFUlJejHWWK9oQrqK6HKFxeaw2oy4yzojzGhBGTFaHxGdHJyyWUyEj2Hb5xKlJOWBuTBxC9dWDUaqUxGK2JxPTeP9QbDUbjHSTAzTVTZj6eo75hL0miYS7XLgQIvAqFl0ymM0OmvqasaK3qIzx6yLavuS06UyWruh3sYA5fMlcOpUoR0hnM1nskU8-lThWgaEaCjTKwWqNeLbKF4OjxlYWhDAsYyeJMOheF27gnhE-aUOSV4JDew6oK+Qbvio7hqhqWo6nqBp+KYm5aC2EGbG46qqLoXgIWe0RYSWOF9OYgyLlsK6WHoG4OLOZhYqMMYauGqxOiEQA */
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
          | { type: "Form input changed"; value: string },
        services: {} as {
          loadTodos: {
            data: string[];
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
