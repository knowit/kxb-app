import { getAbsoluteUrl } from "@/utils/common-utils";
import { redirect } from "next/navigation";

export const runtime = "edge";

export async function GET(request: Request) {
  return redirect(`${getAbsoluteUrl()}/login`);
}
