import { providers, signIn } from "next-auth/client";
import * as React from "react";
import Button from "../components/button";

export default function Login({ loginProviders }) {
  return (
    <div className="flex items-center justify-center">
      {Object.values(loginProviders).map(provider => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: { loginProviders: await providers() }
  };
}
