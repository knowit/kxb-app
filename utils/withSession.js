import { getSession } from "next-auth/client";

export function withSession(getServerSideProps) {
  return async context => {
    const { res } = context;

    const session = await getSession(context);

    res.session = session;

    return await getServerSideProps(context); // Continue on to call `getServerSideProps` logic
  };
}
