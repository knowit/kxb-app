import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function JobOfferLayout({ children }: { children: React.ReactNode }) {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!(user?.isAdmin ?? false)) {
    return redirect("/login");
  }

  return children;
}
