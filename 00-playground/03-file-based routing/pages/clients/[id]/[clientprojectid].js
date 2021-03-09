// http://localhost:3000/clients/max/someproject
import { useRouter } from "next/router";

function ClientProjectDetailsPage() {
  const router = useRouter();
  console.log(router.query); // clientprojectid & id are stored
  return (
    <div>
      <h1>The Client Project Details Page</h1>
    </div>
  );
}

export default ClientProjectDetailsPage;
