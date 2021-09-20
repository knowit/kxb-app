import prisma from "@/lib/prisma";
import { sessionUserIsSpecialist } from "@/utils/sessionUtils";
import { getSession } from "next-auth/client";

export const getResultForAuthenticatedPage = async context => {
  let session = await getSession(context);

  // Session user is specialist and is granted access to the app
  // or
  // session is valid and specialist only mode is disabled
  if (
    sessionUserIsSpecialist(session) ||
    (session &&
      !(process.env.SHOW_ME_THE_MONEY_SPECIALISTS_ONLY_MODE?.toLowerCase() === "true" ?? false))
  ) {
    const { created, updated, refreshToken, ...user } = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        workDayDetails: true
      }
    });

    return {
      props: {
        session,
        user: {
          ...user,
          commission: +user.commission,
          tax: +user.tax
        }
      }
    };
  }

  // We have a session user but the session user is not
  // a specialist. Redirect to access denied
  if (session) {
    return {
      redirect: {
        destination: "/access-denied",
        permanent: false
      }
    };
  }

  // No session. Redirect to login
  return {
    redirect: {
      destination: "/login",
      permanent: false
    }
  };
};
