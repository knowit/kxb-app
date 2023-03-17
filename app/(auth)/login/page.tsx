import { LoginButton } from "@/components/auth/login-button";
import { Icons } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.Logo className="mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            Click to login with your Knowit AD account.
          </p>
        </div>
        <div className=""></div>
        <LoginButton />
      </div>
    </div>
  );
}
