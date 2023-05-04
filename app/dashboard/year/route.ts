import { getAbsoluteUrl } from "@/utils/common-utils";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const runtime = "experimental-edge";

export async function GET(request: NextRequest) {
  redirect(`${getAbsoluteUrl()}/dashboard/year/${new Date().getFullYear()}`);
}
