import { AdminMainNav } from "@/app/admin/_components/admin-main-nav";
import { AdminSideNav } from "@/app/admin/_components/admin-side-nav";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!user.isAdmin) {
    return redirect("/");
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between border-b border-b-neutral-200 py-4">
          <AdminMainNav items={ADMIN_CONSTANTS.MAIN_NAV} />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <AdminSideNav items={ADMIN_CONSTANTS.SIDEBAR_NAV} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
