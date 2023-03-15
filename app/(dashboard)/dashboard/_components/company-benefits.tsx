import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";

const CompanyBenefit = ({ text }: { text: string }) => (
  <Card className="flex items-center">
    <Card.Content className="flex items-center gap-3 p-4">
      <div className="flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full border border-emerald-500 text-emerald-500">
        <Icons.Check />
      </div>
      <span>{text}</span>
    </Card.Content>
  </Card>
);

export default function CompanyBenefits() {
  return (
    <div className="my-8 grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <h2 className="mb-2 text-3xl font-bold text-emerald-500">Knowit Experience Bergen</h2>
        <h3 className="mb-4 text-2xl font-bold">Company Benefits</h3>
        <p>
          You get paid by commission or guaranteed salary. Knowit covers both employer&apos;s
          national insurance contributions (14.10%) and holyday payment (12%). This means you can
          calculate your next payment by the following formulae{" "}
          <span className="italic text-emerald-500">
            work hours in month x hourly rate x commission = your salary.
          </span>
        </p>
      </div>
      <div className="col-span-8 grid grid-cols-2 gap-3">
        {/* transform all to CompanyBenefit component */}
        <CompanyBenefit text="Full pay on paternity leave" />
        <CompanyBenefit text="Pension 5,5% of salary from 1G to 12G" />
        <CompanyBenefit text="Health insurance for all employees" />
        <CompanyBenefit text="New training facilities + scheduled training programmes" />
        <CompanyBenefit text="Free phone with free calls, free SMS and 15 GB data every month" />
        <CompanyBenefit text="Your choice of computer equipment, PC or Mac, mouse and keyboard" />
        <CompanyBenefit text="Subsidized good canteen" />
        <CompanyBenefit text="Generous social budget that guarantees lots of fun" />
      </div>
    </div>
  );
}
