import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ singleEvent }) {
  const deleteEvent = (e) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${singleEvent.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {singleEvent.date} at {singleEvent.time}
        </span>
        <h1>{singleEvent.name}</h1>
        {singleEvent.image && (
          <div className={styles.image}>
            <Image src={singleEvent.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{singleEvent.performers}</p>
        <h3>Description:</h3>
        <p>{singleEvent.description}</p>
        <h3>Venue: {singleEvent.venue}</h3>
        <p>{singleEvent.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// at build time
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);
  const events = await res.json();
  const paths = events.map((singleEvent) => ({
    params: { slug: singleEvent.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      singleEvent: events[0],
    },
    revalidate: 1,
  };
}

// on every request
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       singleEvent: events[0],
//     },
//   };
// }
