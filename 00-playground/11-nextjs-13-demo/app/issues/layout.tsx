import IssuesList from "../../components/issues/issueList";

export default function IssuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>
        <IssuesList issues={[]} />
      </aside>
      {children}
    </div>
  );
}
