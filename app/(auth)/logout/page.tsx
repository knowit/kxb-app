import LogoutPageContent from "@/components/auth/logout-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout"
};

export default function LoginPage() {
  // Ensures that the user is logged out when the page is loaded
  // removing next-auth cookies and redirecting to the homepage
  return <LogoutPageContent />;
}
