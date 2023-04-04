import { UserCalendarYear } from "@/app/dashboard/_components/user-calendar-year";
import { getRequestDateNow } from "@/lib/date";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserWithEarnings } from "@/lib/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "experimental-edge";

export function generateMetadata({ params }: SelectedYearPageProps): Metadata {
  return {
    title: params.year
  };
}

export default async function SelectedYearPage({ params }: SelectedYearPageProps) {
  const date = new Date(params.year ?? getRequestDateNow().getFullYear());
  const token = await getEdgeFriendlyToken();
  const { user, earnings } = await getUserWithEarnings(token.id, date);

  if (!user) {
    return redirect("/logout");
  }

  return (
    <>
      <UserCalendarYear user={user} date={date} workDayDetails={earnings?.workDayDetails} />
    </>
  );
}
