import { Suspense } from "react";
import SalaryForm from "../_components/salary-form";
import SettingsForm from "../_components/settings-form";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h2>Salary details</h2>
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <SalaryForm />
        </Suspense>
      </div>
      <div>
        <h2>Settings</h2>
        <Suspense fallback={<div>loading...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <SettingsForm />
        </Suspense>
      </div>
    </div>
  );
}
