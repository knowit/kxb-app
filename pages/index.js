import { getSession } from "next-auth/client";
import * as React from "react";
import AuthenticatedLayout from "../components/layouts/authenticatedLayout";
import YearlyEarnings from "../components/yearlyEarnings";

export default function HomePage() {
  return (
    <AuthenticatedLayout>
      <YearlyEarnings />
    </AuthenticatedLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session
      }
    };
  }

  context.res.writeHead(301, {
    Location: "/login"
  });
  context.res.end();

  return { props: {} };
}
