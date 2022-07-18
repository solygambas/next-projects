import type { NextPage } from "next";
import { useMachine } from "@xstate/react";
import { todosMachine } from "../machines/todoAppMachine";

const todos = new Set<string>(["Take bins out", "Do laundry"]);

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error("Oh no!");
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo: async (context, event) => {
        throw new Error("Oh no!");
        todos.delete(event.todo);
      },
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      {/* <button
        onClick={() =>
          send({
            type: "Todos loaded",
            todos: ["Take bins out"],
          })
        }
      >
        Todos loaded
      </button>
      <button
        onClick={() =>
          send({
            type: "Loading todos failed",
            errorMessage: "Oh no!",
          })
        }
      >
        Loading todos failed
      </button> */}
      <div>
        {state.matches("Todos Loaded") &&
          state.context.todos.map((todo) => (
            <div
              key={todo}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p>{todo}</p>
              <button
                onClick={() => {
                  send({
                    type: "Delete",
                    todo,
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))}
        {state.matches("Todos Loaded") && (
          <button
            onClick={() => {
              send({ type: "Create new" });
            }}
          >
            Create new
          </button>
        )}
        {state.matches("Deleting todo errored") && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <button
              onClick={() => {
                send({
                  type: "Speed up",
                });
              }}
            >
              Go back to list
            </button>
          </>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send({ type: "Submit" });
            }}
          >
            <input
              onChange={(e) => {
                send({
                  type: "Form input changed",
                  value: e.target.value,
                });
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
