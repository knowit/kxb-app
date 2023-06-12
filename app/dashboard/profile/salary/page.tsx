import { SalaryForm } from "@/app/dashboard/_components/salary-form";
import { UserSalaryDetailsFormSkeleton } from "@/components/user/user-salary-details-form";
import { Suspense } from "react";

export const runtime = "edge";

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Suspense fallback={<UserSalaryDetailsFormSkeleton />}>
          <SalaryForm />
        </Suspense>
      </div>
    </div>
  );
}
