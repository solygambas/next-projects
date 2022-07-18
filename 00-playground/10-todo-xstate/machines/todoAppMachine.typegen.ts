// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.Todo machine.Loading Todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.Todo machine.Loading Todos:invocation[0]"
      | "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]"
      | "error.platform.Todo machine.Deleting todo:invocation[0]";
    assignFormInputToContext: "Form input changed";
  };
  internalEvents: {
    "done.invoke.Todo machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todo machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todo machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.Deleting todo:invocation[0]": {
      type: "error.platform.Todo machine.Deleting todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todo machine.Deleting todo:invocation[0]": {
      type: "done.invoke.Todo machine.Deleting todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todo machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]";
    deleteTodo: "done.invoke.Todo machine.Deleting todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "deleteTodo" | "loadTodos" | "saveTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    deleteTodo: "Delete";
    loadTodos:
      | "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]"
      | "done.invoke.Todo machine.Deleting todo:invocation[0]";
    saveTodo: "Submit";
  };
  eventsCausingGuards: {
    "Has todos": "done.invoke.Todo machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Todos Loaded"
    | "Loading Todos"
    | "Loading todos errored"
    | "Creating new todo"
    | "Creating new todo.Showing form input"
    | "Creating new todo.Saving todo"
    | "Deleting todo"
    | "Deleting todo errored"
    | { "Creating new todo"?: "Showing form input" | "Saving todo" };
  tags: never;
}
