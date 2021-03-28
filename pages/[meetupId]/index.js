import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailsPage() {
  return (
    <MeetupDetail
      title="A First Meetup"
      address="85 S. Edgemont Street, Crawfordsville, IN 47933"
      description="This is a first meetup!"
      image="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
    />
  );
}

export default MeetupDetailsPage;
