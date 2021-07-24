import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ singleEvent }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(singleEvent.date).toLocaleDateString("en-US")} at{" "}
          {singleEvent.time}
        </span>
        <h1>{singleEvent.name}</h1>
        {singleEvent.image && (
          <div className={styles.image}>
            <Image
              src={singleEvent.image.formats.medium.url}
              width={960}
              height={600}
              alt=""
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{singleEvent.performers}</p>
        <h3>Description:</h3>
        <p>{singleEvent.description}</p>
        <h3>Venue: {singleEvent.venue}</h3>
        <p>{singleEvent.address}</p>
        <EventMap singleEvent={singleEvent} />
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// at build time - doesn't work with heroku
// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events/`);
//   const events = await res.json();
//   const paths = events.map((singleEvent) => ({
//     params: { slug: singleEvent.slug },
//   }));
//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       singleEvent: events[0],
//     },
//     revalidate: 1,
//   };
// }

// on every request
export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      singleEvent: events[0],
    },
  };
}
