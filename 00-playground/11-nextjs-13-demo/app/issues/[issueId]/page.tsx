import { PrismaClient } from "@prisma/client";
import { GetStaticPropsContext } from "next";
import IssueDetails from "../../../components/issues/IssueDetails";
import Issue from "../../../components/issues/types";
import { wait } from "../../../util/time";

export default async function IssueDetailsPage({
  params,
}: GetStaticPropsContext) {
  const prisma = new PrismaClient();
  let issue: Issue | null;
  if (params?.issueId) {
    issue = await prisma.issue.findFirst({ where: { id: +params.issueId } });
    await wait(3);
    if (!issue) {
      throw new Error("Issue not found");
    }
    return <IssueDetails issue={issue} />;
  }
}
