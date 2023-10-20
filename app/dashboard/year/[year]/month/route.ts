import { getAbsoluteUrl } from "@/utils/common-utils";
import { NextResponse, type NextRequest } from "next/server";

interface Params {
  year: string;
}

export const runtime = "edge";

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const now = new Date();

  if (params.year === now.getFullYear().toString()) {
    return NextResponse.redirect(
      `${getAbsoluteUrl()}/dashboard/year/${params.year}/month/${now.getMonth()}`
    );
  }

  return NextResponse.redirect(`${getAbsoluteUrl()}/dashboard/year/${params.year}/month/0`);
}
