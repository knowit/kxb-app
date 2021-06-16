import { getProviders, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import * as React from "react";
import LoginButtons from "../components/auth/LoginButtons";
import Heading from "../components/heading";
import Text from "../components/text";

export default function Login({ session }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(!!session);

  React.useEffect(() => {
    if (session) {
      setIsLoading(true);
      router.push("/");
    }
  }, [session]);

  return isLoading ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100 opacity-75 ">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl my-0 mx-auto">
        <div className="mb-6">
          <svg
            className="animate-spin -ml-1 mr-3 h-16 w-16 text-green-500 text:bg-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <Heading variant="pageHeading">Logging you in</Heading>
        <Text>This may take a few seconds, please don&#39;t close this page.</Text>
      </div>
    </div>
  ) : (
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
                <LoginButtons onClick={() => setIsLoading(true)} />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-75"
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
