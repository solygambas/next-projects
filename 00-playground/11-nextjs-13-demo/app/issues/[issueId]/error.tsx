"use client";

import { ErrorProps } from "next/error";

export default function IssueError({ error }: { error: Error }) {
  return <p className="message">{error.message}</p>;
}
