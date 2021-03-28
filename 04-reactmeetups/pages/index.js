import { MongoClient } from "mongodb";

import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image: "/images/m1.jpg",
//     address: "85 S. Edgemont Street, Crawfordsville, IN 47933",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image: "/images/m2.jpg",
//     address: "7718 Ann Court, Greensburg, PA 15601",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// On every request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// During build process
export async function getStaticProps() {
  const connectionString =
    process.env.MONGODB_ATLAS + "meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
      //   meetups: DUMMY_MEETUPS,
    },
    revalidate: 60,
  };
}

export default HomePage;
