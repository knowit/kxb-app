import { AdminContent } from "@/app/admin/_components/admin-content";
import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { UserCard } from "@/app/admin/_components/user/user-card";
import {
  UsersPagination,
  UsersPaginationSkeleton
} from "@/app/admin/users/_components/users-pagination";
import { UsersSearch } from "@/app/admin/users/_components/users-search";
import { db, takeFirst } from "@/lib/db/db";
import { query } from "@/lib/query";
import { desc, like, sql } from "drizzle-orm";
import { Suspense } from "react";
import * as z from "zod";
import { usersTable } from "../../../lib/db/schema";
import { UsersSort } from "./_components/users-sort";

export const runtime = "edge";

type UsersPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const usersPageParamsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  sort: z.string().optional()
});

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await usersPageParamsSchema.safeParseAsync(searchParams);
  const pageSize = 12;

  let usersQuery = db.select().from(usersTable).$dynamic();
  let usersCountQuery = db
    .select({
      // usersTable,
      count: sql<number>`cast(count(${usersTable.id}) as int)`
    })
    .from(usersTable)
    .$dynamic();

  if (params.success && params.data.search) {
    usersQuery = usersQuery.where(like(usersTable.name, `%${params.data.search}%`));
    usersCountQuery = usersCountQuery.where(like(usersTable.name, `%${params.data.search}%`));
  }

  if (params.success && params.data.page) {
    usersQuery = usersQuery.offset(params.success ? (params.data.page - 1) * 12 : 0);
  }

  switch (params.success && params.data.sort) {
    case "name":
      usersQuery = usersQuery.orderBy(usersTable.name);
      break;
    case "updated":
      usersQuery = usersQuery.orderBy(desc(usersTable.updated));
      break;
    default:
      usersQuery = usersQuery.orderBy(desc(usersTable.updated));
  }

  const [users, usersCount] = await query([
    usersQuery.limit(pageSize).execute(),
    usersCountQuery.then(takeFirst)
  ]);

  return (
    <AdminShell>
      <AdminHeader heading="Users" text="Create and manage users">
        <Suspense fallback={<UsersPaginationSkeleton />}>
          <UsersPagination
            page={params.success && params.data.page ? params.data.page : 1}
            pageSize={pageSize}
            total={Number(usersCount.data?.count ?? 0)}
          />
        </Suspense>
      </AdminHeader>
      <AdminContent>
        <div className="flex items-center gap-3">
          <UsersSearch className="my-4" />
          <UsersSort />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {users.data?.map(user => (
            <Suspense key={`suspense-${user.id}`} fallback={<div>loading...</div>}>
              <UserCard key={`user-card-${user.id}`} user={user} />
            </Suspense>
          ))}
        </div>
      </AdminContent>
    </AdminShell>
  );
}
