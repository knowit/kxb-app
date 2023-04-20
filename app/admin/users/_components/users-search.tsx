"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/utils/common-utils";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

type UsersSearchProps = ComponentPropsWithoutRef<typeof Input>;

const handleRouterPush = (router: AppRouterInstance, value: string) => {
  if (value.length > 0) {
    router.push(`/admin/users?search=${value}`);
  } else {
    router.push(`/admin/users`);
  }
};

const handleRouterPushDebounced = debounce(handleRouterPush, 500);

const UsersSearch = ({ ...other }: UsersSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams?.get("search") ?? "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    handleRouterPushDebounced(router, value);
  };

  return (
    <Input
      placeholder="Search users"
      onChange={handleSearch}
      value={value}
      autoFocus={searchParams?.has("search") ?? false}
      {...other}
    />
  );
};

export { UsersSearch };
