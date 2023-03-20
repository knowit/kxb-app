import { UserSalaryDetailsForm } from "@/components/user/user-salary-details-form";
import { getUser } from "@/lib/user";

export default async function SalaryForm() {
  const user = await getUser();

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
