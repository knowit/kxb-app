import { LoginPageContent } from "@/components/auth/login-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};

export default function LoginPage() {
  return <LoginPageContent />;
}
