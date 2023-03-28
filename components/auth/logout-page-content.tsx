"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

// Ensures that the user is logged out when the page is loaded
// removing next-auth cookies and redirecting to the homepage
export default function LogoutPageContent() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return <div />;
}
