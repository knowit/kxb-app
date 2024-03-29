import { AdminMainNav } from "@/app/admin/_components/admin-main-nav";
import { AdminSideNav } from "@/app/admin/_components/admin-side-nav";
import { RefreshRSCOnFocus } from "@/components/refresh-rsc-on-focus";
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
      <div className="mx-auto flex min-h-screen flex-col">
        <header className="z-40 border-b border-b-neutral-700 bg-neutral-950 px-4">
          <AdminMainNav />
        </header>
        <div className="container relative grid grow gap-12 bg-neutral-900 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col border-r border-r-neutral-700 pr-6 pt-8 md:flex">
            <AdminSideNav />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden ">{children}</main>
        </div>
      </div>
      {modal}
      <RefreshRSCOnFocus />
    </>
  );
}
