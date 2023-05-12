import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { type ReadonlyURLSearchParams } from "next/navigation";

function getAndSetUsersSearchParams(routerSearchParams: ReadonlyURLSearchParams | null) {
  const searchParams = new URLSearchParams();

  ADMIN_CONSTANTS.USERS_SEARCH_PARAMS.forEach(param => {
    const paramValue = routerSearchParams?.get(param);

    if (paramValue) {
      searchParams.set(param, paramValue);
    }
  });

  return searchParams;
}

function appendUsersSearchParam(
  routerSearchParams: ReadonlyURLSearchParams | null,
  param: string,
  value: string
) {
  const searchParams = getAndSetUsersSearchParams(routerSearchParams);

  searchParams.set(param, value);

  return searchParams;
}

export { appendUsersSearchParam, getAndSetUsersSearchParams };
