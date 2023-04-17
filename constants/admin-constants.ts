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
      icon: "Gear"
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "Gear"
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "Gear"
    }
  ]
};

export { ADMIN_CONSTANTS };
