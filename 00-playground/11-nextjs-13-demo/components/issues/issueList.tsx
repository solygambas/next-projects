import Link from "next/link";

interface Issue {
  id: number;
  title: string;
  summary: string;
  description: string;
}

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
