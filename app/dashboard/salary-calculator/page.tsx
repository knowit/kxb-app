import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import { SalaryCalculator } from "@/components/salary/salary-calculator";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Salary calculator"
};

export default async function SalaryCalculatorPage() {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!(user?.isAdmin ?? false)) {
    return redirect("/logout");
  }

  return (
    <>
      <h1>Salary calculator</h1>
      <SalaryCalculator className="mb-16" />
      <CompanyBenefits />
    </>
  );
}
