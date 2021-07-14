import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ singleEvent }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${singleEvent.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
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
          {new Date(singleEvent.date).toLocaleDateString("en-US")} at{" "}
          {singleEvent.time}
        </span>
        <h1>{singleEvent.name}</h1>
        <ToastContainer />
        {singleEvent.image && (
          <div className={styles.image}>
            <Image
              src={singleEvent.image.formats.medium.url}
              width={960}
              height={600}
            />
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
  const res = await fetch(`${API_URL}/events/`);
  const events = await res.json();
  const paths = events.map((singleEvent) => ({
    params: { slug: singleEvent.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
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
//   const res = await fetch(`${API_URL}/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       singleEvent: events[0],
//     },
//   };
// }
