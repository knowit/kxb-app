import { UserSalaryDetailsFormSkeleton } from "@/components/user/user-salary-details-form";

export default function SalaryLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <UserSalaryDetailsFormSkeleton />
    </div>
  );
}
