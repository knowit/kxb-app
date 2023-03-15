import { UserSalaryDetailsForm } from "@/components/user/user-salary-details-form";
import { getCurrentUser } from "@/lib/session";

export default async function SalaryForm() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <UserSalaryDetailsForm
      user={{
        id: +user.id,
        commission: user.commission,
        hourlyRate: user.hourlyRate,
        tax: user.tax,
        workHours: user.workHours
      }}
    />
  );
}
