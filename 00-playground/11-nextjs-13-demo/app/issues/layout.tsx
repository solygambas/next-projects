import { PrismaClient } from "@prisma/client";
import classes from "./layout.module.css";
import IssuesList from "../../components/issues/issueList";

export default async function IssuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prisma = new PrismaClient();
  const issues = await prisma.issue.findMany();
  return (
    <div className={classes.layout}>
      <aside className={classes.sidebar}>
        <IssuesList issues={issues} />
      </aside>
      {children}
    </div>
  );
}
