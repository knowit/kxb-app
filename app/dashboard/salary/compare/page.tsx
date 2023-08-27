import { UserEditSalaryDetailsDialog } from "@/components/user/user-edit-salary-details-dialog";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { CompareSalaryInputs } from "./_components/compare-salary-inputs";

export const runtime = "edge";

export const metadata = {
  title: "Salary compare"
};

export default async function SalaryComparePage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!(user?.isAdmin ?? false)) {
    return redirect("/logout");
  }

  const workHours = searchParams.workHours ? +searchParams.workHours : undefined;
  const hourlyRate = searchParams.hourlyRate ? +searchParams.hourlyRate : undefined;
  const commission = searchParams.commission ? +searchParams.commission : undefined;
  const tax = searchParams.tax ? +searchParams.tax : undefined;
  const taxTable = searchParams.taxTable ? searchParams.taxTable?.toString() : undefined;

  return (
    <>
      <h1>Compare salary</h1>
      <UserEditSalaryDetailsDialog user={user} />
      <CompareSalaryInputs
        initialWorkHours={workHours}
        initialHourlyRate={hourlyRate}
        initialCommission={commission}
        initialTax={tax}
        initialTaxTable={taxTable}
      />
    </>
  );
}
