import { AdminContent } from "@/app/admin/_components/admin-content";
import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { UserCard } from "@/app/admin/_components/user/user-card";
import {
  UsersPagination,
  UsersPaginationSkeleton
} from "@/app/admin/users/_components/users-pagination";
import { UsersSearch } from "@/app/admin/users/_components/users-search";
import { db } from "@/lib/db";
import { query } from "@/lib/query";
import { Suspense } from "react";
import * as z from "zod";
import { UsersSort } from "./_components/users-sort";


type UsersPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const usersPageParamsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  sort: z.string().optional()
});

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { count } = db.fn;

  const params = await usersPageParamsSchema.safeParseAsync(searchParams);
  const pageSize = 12;

  let usersQuery = db.selectFrom("user").selectAll();
  let usersCountQuery = db.selectFrom("user").select(count("id").as("num_users"));

  if (params.success && params.data.search) {
    usersQuery = usersQuery.where("name", "like", `%${params.data.search}%`);
    usersCountQuery = usersCountQuery.where("name", "like", `%${params.data.search}%`);
  }

  if (params.success && params.data.page) {
    usersQuery = usersQuery.offset(params.success ? (params.data.page - 1) * 12 : 0);
  }

  switch (params.success && params.data.sort) {
    case "name":
      usersQuery = usersQuery.orderBy("name", "asc");
      break;
    case "updated":
      usersQuery = usersQuery.orderBy("updated", "desc");
      break;
    default:
      usersQuery = usersQuery.orderBy("updated", "desc");
  }

  const [users, usersCount] = await query([
    usersQuery.limit(pageSize).execute(),
    usersCountQuery.executeTakeFirst()
  ]);

  return (
    <AdminShell>
      <AdminHeader heading="Users" text="Create and manage users">
        <Suspense fallback={<UsersPaginationSkeleton />}>
          <UsersPagination
            page={params.success && params.data.page ? params.data.page : 1}
            pageSize={pageSize}
            total={Number(usersCount.data?.num_users ?? 0)}
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
