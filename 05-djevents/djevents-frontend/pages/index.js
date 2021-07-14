import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((singleEvent) => (
        <EventItem key={singleEvent.id} singleEvent={singleEvent} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

// at build time
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();
  return {
    props: { events },
    revalidate: 1,
  };
}

// on every request
// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();
//   return {
//     props: { events: events.slice(0, 3) },
//   };
// }
