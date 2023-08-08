"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { appendUsersSearchParam } from "../_utils/search-params-utils";

type UsersSortProps = ComponentPropsWithoutRef<typeof SelectTrigger>;

const UsersSort = ({ className, ...other }: UsersSortProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={
        searchParams?.get("sort") ??
        ADMIN_CONSTANTS.USERS_SORT_OPTIONS.find(sort => sort.default)?.value ??
        ""
      }
      onValueChange={value =>
        router.push(
          `/admin/users?${appendUsersSearchParam(searchParams, "sort", value).toString()}`
        )
      }
    >
      <SelectTrigger className={cn("max-w-[8rem]", className)} {...other}>
        <SelectValue placeholder="Sort" />
        <span className="sr-only">Users sort</span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(ADMIN_CONSTANTS.USERS_SORT_OPTIONS).map(sort => (
          <SelectItem key={sort.value} value={sort.value}>
            <div className="flex items-center gap-3">{sort.i18n.en}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { UsersSort };
