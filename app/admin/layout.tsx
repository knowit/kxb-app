import { AdminMainNav } from "@/app/admin/_components/admin-main-nav";
import { AdminSideNav } from "@/app/admin/_components/admin-side-nav";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function AdminLayout({ children, modal }: AdminLayoutProps) {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!user.isAdmin) {
    return redirect("/");
  }

  return (
    <>
      <div className="mx-auto flex flex-col">
        <header className="sticky top-0 z-40 bg-neutral-950">
          <div className="flex h-16 items-center justify-between border-b border-b-neutral-700 p-4">
            <AdminMainNav items={ADMIN_CONSTANTS.MAIN_NAV} />
          </div>
        </header>
        <div className="container relative grid gap-12 bg-neutral-900 md:grid-cols-[200px_1fr]">
          <aside className="sticky top-0 hidden w-[200px] flex-col border-r border-r-neutral-700 pr-6 pt-8 md:flex">
            <AdminSideNav items={ADMIN_CONSTANTS.SIDEBAR_NAV} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden ">{children}</main>
        </div>
      </div>
      {modal}
    </>
  );
}
