import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SalaryForm from "../_components/salary-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="grid grid-cols-2">
      <Suspense fallback={<div>loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <SalaryForm />
      </Suspense>
    </div>
  );
}
