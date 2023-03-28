"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Icons } from "@/components/icons";
import { Show } from "@/components/ui/show";
import { useState } from "react";

function LoginPageContent() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:max-w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.Logo className="mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLoggingIn ? "Logging you in" : "Welcome back"}
          </h1>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            {isLoggingIn
              ? "This may take a few seconds, please don't close this page."
              : "Click to login with your Knowit AD account."}
          </p>
        </div>
        <LoginButton
          className="mx-auto w-full max-w-[300px]"
          disabled={isLoggingIn}
          onLoginClicked={() => setIsLoggingIn(true)}
        >
          {isLoggingIn ? "Logging you in..." : "Login with Knowit AD"}
          <Show when={isLoggingIn}>
            <Icons.Loader className="ml-2 h-4 w-4" />
          </Show>
        </LoginButton>
      </div>
    </div>
  );
}

export { LoginPageContent };
