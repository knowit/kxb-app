import { getSession } from "next-auth/client";
import * as React from "react";
import Heading from "../components/heading";
import Text from "../components/text";
import { sessionUserIsSpecialist } from "../utils/sessionUtils";

export default function AccessDenied({ session }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100 opacity-75 ">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl my-0 mx-auto">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-32 w-32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <Heading
          className="text-center"
          variant="pageHeading"
        >{`Hi ${session?.user?.name}`}</Heading>
        <Text className="text-center">
          We found an account in your name, but you seem lack access to this app. If this is a
          mistake and you should have access, then please send an email to{" "}
          <a className="text-green-500 dark:text-green-400" href="mailto:tommy.barvag@knowit.no">
            tommy.barvag@knowit.no
          </a>{" "}
          requesting access.
        </Text>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Session user is specialist and should not see
  // access denied page. Redirect to index
  if (sessionUserIsSpecialist(session)) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
}
