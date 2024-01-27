import Link from "next/link";

async function getTickets() {
  const response = await fetch("http://localhost:4000/tickets", {
    next: { revalidate: 0 }, // opt out of using cache
  });
  const data = await response.json();
  return data;
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no tickets found, yay!</p>
      )}
    </>
  );
}
