import { getAbsoluteUrl } from "@/utils/common-utils";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

interface Params {
  year: string;
}

export const runtime = "experimental-edge";

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const now = new Date();

  if (params.year === now.getFullYear().toString()) {
    redirect(`${getAbsoluteUrl()}/dashboard/year/${params.year}/month/${now.getMonth()}`);
  }

  redirect(`${getAbsoluteUrl()}/dashboard/year/${params.year}/month/0`);
}
