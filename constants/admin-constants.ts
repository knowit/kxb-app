import { AdminConfig } from "@/types";

const ADMIN_CONSTANTS: AdminConfig = {
  MAIN_NAV: [
    {
      title: "Dashboard",
      href: "/dashboard",
      disabled: false
    }
  ],
  SIDEBAR_NAV: [
    {
      title: "Admin",
      href: "/admin",
      icon: "LockClosed"
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "Person"
    },
    {
      title: "Job offers",
      href: "/admin/job-offers",
      icon: "Rocket"
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "Gear"
    }
  ],
  USERS_PAGE_SIZE: 12,
  USERS_SEARCH_PARAMS: ["page", "search", "sort", "tag"],
  USERS_SORT_OPTIONS: [
    {
      value: "name",
      default: false,
      i18n: {
        en: "Name",
        no: "Navn"
      }
    },
    {
      value: "updated",
      default: true,
      i18n: {
        en: "Updated",
        no: "Oppdatert"
      }
    }
  ]
};

export { ADMIN_CONSTANTS };
