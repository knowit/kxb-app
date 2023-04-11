import { getAbsoluteUrl } from "@/utils/common-utils";
import { type ServerRuntime } from "next";
import { redirect } from "next/navigation";

export const runtime: ServerRuntime = "experimental-edge";

export async function GET(request: Request) {
  return redirect(`${getAbsoluteUrl()}/login`);
}
