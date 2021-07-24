import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ singleEvent }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            singleEvent.image
              ? singleEvent.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt=""
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(singleEvent.date).toLocaleDateString("en-US")} at{" "}
          {singleEvent.time}
        </span>
        <h3>{singleEvent.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${singleEvent.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
