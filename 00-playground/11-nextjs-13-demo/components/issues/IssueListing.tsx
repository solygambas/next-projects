import Link from "next/link";
import Issue from "./types";

function IssuesList({ issues }: { issues: Issue[] }) {
  return (
    <ul>
      {issues.map((issue: Issue) => (
        <li key={issue.id}>
          <article>
            <h2>{issue.title}</h2>
            <p>{issue.summary}</p>
            <p>
              <Link href={`/issues/${issue.id}`}>View Details</Link>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default IssuesList;
