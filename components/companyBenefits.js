import Card from "@/components/card";
import Heading from "@/components/heading";
import { CheckCircle } from "@/components/icons/svgs/hero";
import Text from "@/components/text";
import * as React from "react";

function Benefit({ children, icon = CheckCircle, iconProps = {} }) {
  const Icon = icon;
  return (
    <Card>
      <div className="flex gap-3 min-h-[48px]">
        <div>
          <Icon {...iconProps} />
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
}

export default function CompanyBenefits() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-12">
      <div className="max-w-full lg:max-w-[320px]">
        <Heading
          as="h6"
          className="text-center lg:text-left !mb-0 text-green-500 dark:text-green-400"
        >
          Knowit Experience Bergen
        </Heading>
        <Heading className="text-center lg:text-left">Company Benefits</Heading>
        <Text className="text-center lg:text-left">
          You get paid by commission or guaranteed salary. Knowit covers both employer's national
          insurance contributions (14.10%) and holyday payment (12%). This means you can calculate
          your next payment by the following formulae{" "}
          <span className="text-black bg-green-500 dark:bg-green-400">
            Work hours in month x hourly rate x commission = your salary.
          </span>
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Full pay on paternity leave
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Pension 5,5% of salary from 1G to 12G
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Health insurance for all employees
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          New training facilities + scheduled training programmes
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Free phone with free calls, free SMS and 15 GB data every month
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Your choice of computer equipment, PC or Mac, mouse and keyboard
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Subsidized good canteen
        </Benefit>
        <Benefit iconProps={{ className: "text-green-500 dark:text-green-400" }}>
          Generous social budget that guarantees lots of fun
        </Benefit>
      </div>
    </div>
  );
}
