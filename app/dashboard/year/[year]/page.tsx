import { CalendarYear } from "@/app/dashboard/_components/calendar-year";
import { getRequestDateNow } from "@/lib/date";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserEarnings } from "@/lib/user";
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
  const { user, earnings } = await getUserEarnings(token.id, date);

  if (!user) {
    return redirect("/logout");
  }

  return (
    <>
      <CalendarYear date={date} workDayDetails={earnings?.workDayDetails} />
    </>
  );
}
