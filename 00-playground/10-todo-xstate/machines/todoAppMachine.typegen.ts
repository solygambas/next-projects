// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
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
    "done.invoke.Todo machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todo machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.Deleting todo:invocation[0]": {
      type: "error.platform.Todo machine.Deleting todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todo machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "xstate.after(2500)#Todo machine.Deleting todo errored": {
      type: "xstate.after(2500)#Todo machine.Deleting todo errored";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    deleteTodo: "done.invoke.Todo machine.Deleting todo:invocation[0]";
    loadTodos: "done.invoke.Todo machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "saveTodo" | "deleteTodo";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignErrorToContext:
      | "error.platform.Todo machine.Creating new todo.Saving todo:invocation[0]"
      | "error.platform.Todo machine.Deleting todo:invocation[0]"
      | "error.platform.Todo machine.Loading Todos:invocation[0]";
    assignFormInputToContext: "Form input changed";
    assignTodosToContext: "done.invoke.Todo machine.Loading Todos:invocation[0]";
  };
  eventsCausingServices: {
    deleteTodo: "Delete";
    loadTodos:
      | "done.invoke.Todo machine.Creating new todo.Saving todo:invocation[0]"
      | "done.invoke.Todo machine.Deleting todo:invocation[0]"
      | "xstate.init";
    saveTodo: "Submit";
  };
  eventsCausingGuards: {
    "Has todos": "done.invoke.Todo machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Creating new todo"
    | "Creating new todo.Saving todo"
    | "Creating new todo.Showing form input"
    | "Deleting todo"
    | "Deleting todo errored"
    | "Loading Todos"
    | "Loading todos errored"
    | "Todos Loaded"
    | { "Creating new todo"?: "Saving todo" | "Showing form input" };
  tags: never;
}
