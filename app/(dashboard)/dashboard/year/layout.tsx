import { Suspense } from "react";
import SalaryForm from "../_components/salary-form";

interface YearLayoutProps {
  children: React.ReactNode;
}

export default async function YearLayout({ children }: YearLayoutProps) {
  return (
    <div className="grid grid-cols-2 gap-12">
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <SalaryForm />
      </Suspense>
      {children}
    </div>
  );
}
