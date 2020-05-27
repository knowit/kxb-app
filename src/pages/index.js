import fs from "fs";
import path from "path";
import * as React from "react";
import { promisify } from "util";
import YearlyEarnings from "../containers/yearlyEarnings";

const readFile = promisify(fs.readFile);

export default function HomePage({ data }) {
  return <YearlyEarnings year={data?.data ?? {}} />;
}

export async function getStaticProps() {
  const year = new Date().getFullYear();
  const data = await readFile(path.join(process.cwd(), `/__data__/${year}.json`), "UTF-8");

  return {
    props: {
      data: JSON.parse(data ?? {})
    }
  };
}
