import Heading from "@/components/heading";
import Text from "@/components/text";
import { sessionUserIsSpecialist } from "@/utils/sessionUtils";
import { getSession } from "next-auth/client";
import * as React from "react";
import { HiLockClosed } from "react-icons/hi";

export default function AccessDenied({ session }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100 opacity-75 ">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl my-0 mx-auto">
        <div className="mb-8">
          <HiLockClosed className="w-24 h-24" />
        </div>
        <Heading
          className="text-center mb-16 lg:mb-24"
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
