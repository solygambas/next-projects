import { MongoClient, ObjectId } from "mongodb";

import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title} | React Meetups</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const connectionString =
    process.env.MONGODB_ATLAS + "meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const connectionString =
    process.env.MONGODB_ATLAS + "meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // only fetching ids
  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: "blocking",
  };
}

export default MeetupDetailsPage;
