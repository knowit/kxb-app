import { Icons } from "@/components/icons";
import { Prose } from "@/components/prose";
import { Card, CardContent } from "@/components/ui/card";

const CompanyBenefit = ({ text }: { text: string }) => (
  <Card className="flex min-h-[82px] items-center">
    <CardContent className="flex items-center gap-3 p-4">
      <div className="flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full border border-emerald-500 text-emerald-500">
        <Icons.Check />
      </div>
      <span>{text}</span>
    </CardContent>
  </Card>
);

function CompanyBenefits() {
  return (
    <div className="my-8 grid grid-cols-12 gap-8">
      <Prose className="col-span-12 lg:col-span-5">
        <h2 className="mb-2 text-3xl font-bold text-emerald-500">Knowit Experience Bergen</h2>
        <h3 className="mb-4 text-2xl font-bold">Company Benefits</h3>
        <p>
          At Knowit, you can receive pay in the form of commission or a guaranteed salary. If your
          commission falls below your guaranteed amount, your salary will be topped up to that
          amount.
        </p>
        <p>
          Knowit covers both employer&apos;s national insurance contributions (14.10%) and holiday
          payment (12%). To calculate your next payment, simply use the following formula:{" "}
          <span className="italic text-emerald-500">
            work hours in a month x hourly rate x commission = your salary.
          </span>
        </p>
      </Prose>
      <div className="col-span-12 grid grid-cols-1 gap-3 lg:col-span-7 lg:grid-cols-2">
        {/* transform all to CompanyBenefit component */}
        <CompanyBenefit text="Full pay on parental leave" />
        <CompanyBenefit text="Pension 5,5% of salary from 0G to 12G" />
        <CompanyBenefit text="Health insurance for all employees" />
        <CompanyBenefit text="Training facilities" />
        <CompanyBenefit text="Your choice of phone with free calls, free SMS and 15 GB data every month" />
        <CompanyBenefit text="Your choice of computer equipment, PC or Mac, mouse and keyboard" />
        <CompanyBenefit text="Subsidized canteen" />
        <CompanyBenefit text="Generous social budget that guarantees lots of fun" />
      </div>
    </div>
  );
}

export { CompanyBenefits };
