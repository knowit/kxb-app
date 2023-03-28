import { UserSalaryDetailsForm } from "@/components/user/user-salary-details-form";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

async function SalaryForm() {
  const token = await getEdgeFriendlyToken();

  const user = await getUser(token.id);

  if (!user) {
    return redirect("/logout");
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

export { SalaryForm };
