import { getRequestDateNow } from "@/lib/date";
import { redirect } from "next/navigation";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "experimental-edge";

export default async function SelectedYearMonthPageRoot({ params }: SelectedYearPageProps) {
  const dateNow = getRequestDateNow();

  if (params.year === dateNow.getFullYear().toString()) {
    redirect(`/dashboard/year/${params.year}/month/${dateNow.getMonth()}`);
  }

  redirect(`/dashboard/year/${params.year}/month/0`);

  return <div>...</div>;
}
