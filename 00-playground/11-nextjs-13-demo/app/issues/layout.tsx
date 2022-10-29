import { PrismaClient } from "@prisma/client";
import classes from "./layout.module.css";
import IssuesListing from "../../components/issues/IssueListing";

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
        <IssuesListing issues={issues} />
      </aside>
      {children}
    </div>
  );
}
