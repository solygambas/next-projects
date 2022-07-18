import type { NextPage } from "next";
import { useMachine } from "@xstate/react";
import { todosMachine } from "../machines/todoAppMachine";

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error("Oh no!");
        return ["Take bins out", "Do laundry"];
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
        {state.matches("Todos Loaded") && (
          <button
            onClick={() => {
              send({ type: "Create new" });
            }}
          >
            Create new
          </button>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <input
            onChange={(e) => {
              send({
                type: "Form input changed",
                value: e.target.value,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
