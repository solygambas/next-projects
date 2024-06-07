"use client";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage = ({ loading }: { loading: boolean }) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={override}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default LoadingPage;
