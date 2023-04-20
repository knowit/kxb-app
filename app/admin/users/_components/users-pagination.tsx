"use client";

import { Icons } from "@/components/icons";
import { ButtonSkeleton } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { appendUsersSearchParam } from "../_utils/search-params-utils";

const UsersPagination = ({
  page,
  pageSize,
  total
}: {
  page: number;
  pageSize: number;
  total: number;
}) => {
  const routerSearchParams = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LinkButton
          href={`/admin/users?${appendUsersSearchParam(
            routerSearchParams,
            "page",
            (page - 1).toString()
          )}`}
          size="sm"
          disabled={page <= 1}
        >
          <Icons.ChevronLeft />
        </LinkButton>
        <span className="min-w-[52px] text-center text-sm">
          {page} of {totalPages}
        </span>
        <LinkButton
          href={`/admin/users?${appendUsersSearchParam(
            routerSearchParams,
            "page",
            (page + 1).toString()
          )}`}
          size="sm"
          disabled={page * pageSize > total}
        >
          <Icons.ChevronRight />
        </LinkButton>
      </div>
    </div>
  );
};

const UsersPaginationSkeleton = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <ButtonSkeleton className="min-w-[33px]">
        <Icons.ChevronLeft />
      </ButtonSkeleton>
      <Skeleton className="min-w-[52px] text-center text-sm" />
      <ButtonSkeleton className="min-w-[33px]">
        <Icons.ChevronRight />
      </ButtonSkeleton>
    </div>
  </div>
);

export { UsersPagination, UsersPaginationSkeleton };
