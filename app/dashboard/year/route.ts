import { getAbsoluteUrl } from "@/utils/common-utils";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.redirect(`${getAbsoluteUrl()}/dashboard/year/${new Date().getFullYear()}`);
}
