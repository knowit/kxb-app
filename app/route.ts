import "server-only";

import { redirect } from "next/navigation";

export async function GET(request: Request) {
  redirect("/login");
}
