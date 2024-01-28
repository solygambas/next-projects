import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticPaths() {
  const response = await fetch("http://localhost:4000/tickets");
  const tickets = await response.json();
  const paths = tickets.map((ticket) => ({
    params: { id: ticket.id },
  }));
  return { paths };
}

async function getTicket(id) {
  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    notFound();
  }
  const data = await response.json();
  return data;
}

export default async function TicketDetailsPage({ params: { id } }) {
  const ticket = await getTicket(id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
