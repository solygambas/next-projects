import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({ singleEvent, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${singleEvent.slug}`}>
          <a>{singleEvent.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${singleEvent.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href="#"
        className={styles.delete}
        onClick={() => handleDelete(singleEvent.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
