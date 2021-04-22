import { getProviders, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import * as React from "react";
import LoginButtons from "../components/auth/LoginButtons";
import Heading from "../components/heading";
import Text from "../components/text";

export default function Login({ session }) {
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="relative bg-white dark:bg-black overflow-hidden h-screen">
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative z-10 pb-8 bg-white dark:bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-full">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-black transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
            <div className="sm:text-center lg:text-left">
              <Heading
                variant="pageHeading"
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                KXB Specialist
              </Heading>
              <Text>Login to see your estimated salary.</Text>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <LoginButtons />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
      loginProviders: await getProviders()
    }
  };
}
