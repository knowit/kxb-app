import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function GET(request: Request) {
  redirect("/login");
}
