import { UserSalaryDetailsFormSkeleton } from "@/components/user/user-salary-details-form";
import { Suspense } from "react";
import SalaryForm from "../../_components/salary-form";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Suspense fallback={<UserSalaryDetailsFormSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <SalaryForm />
        </Suspense>
      </div>
    </div>
  );
}
