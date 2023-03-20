import { Suspense } from "react";
import SalaryForm from "../_components/salary-form";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-2">
      <Suspense fallback={<div>loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <SalaryForm />
      </Suspense>
    </div>
  );
}
