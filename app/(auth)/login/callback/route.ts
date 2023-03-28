import { getEdgeFriendlyToken } from "@/lib/token";
import { getAbsoluteUrl } from "@/utils/common-utils";
import { redirect } from "next/navigation";

export const runtime = "experimental-edge";

export async function GET(request: Request) {
  const token = await getEdgeFriendlyToken();

  // On login callback, we should redirect to salary calculator if sales person
  if (token?.email && process.env.SALES_EMAILS.split(";").includes(token.email)) {
    redirect(`${getAbsoluteUrl()}/dashboard/salary-calculator`);
  }

  return redirect(`${getAbsoluteUrl()}/dashboard`);
}
