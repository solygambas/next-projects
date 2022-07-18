import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJgDa0SSJQAB07EALsVSlBIAB6IAjABYADBQCcKgMxaA7AFYF+gBzGATLrMA2ADQgAnogC0BiipXrj+-VotX96rpKAL7Bdhw4BCTk1HwMTOicrDR08WKJXABmuMTcAkggIrDiktIF8ghOZioKFFo1QSpWSrrGSvVmdo4I1RTGClpW5lrqSqZaA8ahYSCk6HAyEXhEZJQcXCn8EDJFJVIyFQoKxhS6R4Faxur6Zgpm6rYOiCMULeoTZi03N2ah4YmRFYxTbxdY7UQSfblZzVWqedRmXzGEYjFS6LrOfoUfQeNpXZFWdy6dR-EBLKKrWKpUiMdIsTBgABOjNQjPywghpQOMIsFCsCK0AXuNy8WgxCCOWg01iUZnMsvcx1J5KBYHBxUhZVAFSqhj5AqF1zlPnFTiMSmxuMuVnqQS802CQA */
  createMachine(
    {
      id: "Todo machine",
      initial: "Loading Todos",
      schema: {
        // events: {} as
        //   | { type: "Todos loaded"; todos: string[] }
        //   | { type: "Loading todos failed"; errorMessage: string },
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      states: {
        "Todos Loaded": {},
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Todos Loaded",
              },
            ],
            onError: [
              {
                target: "Loading todos errored",
              },
            ],
          },
        },
        "Loading todos errored": {},
      },
    }
    // {
    //   actions: {
    //     consoleLogTodos: (context, event) => {
    //       alert(JSON.stringify(event.todos));
    //     },
    //   },
    // }
  );
