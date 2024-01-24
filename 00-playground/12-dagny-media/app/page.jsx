"use client";
import { useState, useEffect } from "react";
import Courses from "./components/Courses";
import LoadingPage from "./loading";
import CourseSearch from "./components/CourseSearch";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses");
      const courses = await response.json();
      setCourses(courses);
      setLoading(false);
    }
    fetchCourses();
  }, []);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <h1>Welcome to Dagny Media</h1>
      <CourseSearch getSearchResults={(results) => setCourses(results)} />
      <Courses courses={courses} />
    </>
  );
};

export default HomePage;
