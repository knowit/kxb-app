import { getRequestDateNow } from "@/lib/date";
import { redirect } from "next/navigation";

export const runtime = "experimental-edge";

export default async function RootYearPage() {
  redirect("/dashboard/year/" + getRequestDateNow().getFullYear());

  return <div>...</div>;
}
