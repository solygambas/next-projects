// http://localhost:3000/clients/max
import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  function loadProjectHandler() {
    // router.push("/clients/max/projecta");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
    // router.replace("/clients/max/projecta"); // replace actual page in history, user can't go back
  }

  return (
    <div>
      <h1>The Projects of a given client Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
