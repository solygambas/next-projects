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
    </div>
  );
};

export default Home;
