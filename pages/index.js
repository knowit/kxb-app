import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import * as React from "react";

export default function Home({ session }) {
  return <></>;
}

Home.layoutProps = {
  meta: {
    title: "Home"
  },
  Layout: AuthenticatedLayout
};
