import { useState, Fragment } from "react";
import { buildFeedbackPath, extractFeedback } from "./api/feedback/index";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    console.log(id);
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feebackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment> // alternative to bind: {() => loadFeedbackHandler(item.id)}
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feebackItems: data,
    },
  };
}

export default FeedbackPage;
