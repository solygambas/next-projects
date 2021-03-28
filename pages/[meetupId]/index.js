import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailsPage(props) {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      image={props.meetupData.image}
    />
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: meetupId,
        title: "A First Meetup",
        address: "85 S. Edgemont Street, Crawfordsville, IN 47933",
        description: "This is a first meetup!",
        image: "/images/m1.jpg",
      },
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    fallback: false,
  };
}

export default MeetupDetailsPage;
