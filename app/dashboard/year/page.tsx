import { getRequestDateNow } from "@/lib/date";
import { redirect } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function RootYearPage() {
  redirect("/dashboard/year/" + getRequestDateNow().getFullYear());

  return <div>...</div>;
}
