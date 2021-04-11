import * as React from "react";
import BouncyInput from "./bouncyInput";

export const calculateEarningsInputsDefaultOptions = {
  workHoursPerDay: 7.5,
  hourlyRate: 1300,
  commission: 0.48,
  tax: 0.39,
  nonCommissionedHours: 0
};

export default function CalculateEarningsInputs({
  options = calculateEarningsInputsDefaultOptions,
  onChange = () => {}
}) {
  const [workHoursPerDay, setWorkHoursPerDay] = React.useState(options.workHoursPerDay);
  const [hourlyRate, setHourlyRate] = React.useState(options.hourlyRate);
  const [commission, setCommission] = React.useState(options.commission);
  const [tax, setTax] = React.useState(options.tax);
  const [nonCommissionedHours, setNonCommissionedHours] = React.useState(
    options.nonCommissionedHours
  );

  React.useEffect(() => {
    onChange({
      workHoursPerDay,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    });
  }, [workHoursPerDay, hourlyRate, commission, tax, nonCommissionedHours]);

  return (
    <div className="flex flex-col">
      <BouncyInput
        id="work-hours-per-day"
        label="Work hours per day"
        initialValue={workHoursPerDay}
        placeholder="Work hours per day"
        type="number"
        onChange={inputValue => setWorkHoursPerDay(inputValue)}
      />
      <BouncyInput
        id="hourly-rate"
        label="Hourly rate"
        initialValue={hourlyRate}
        placeholder="TimHourly rateesats"
        type="number"
        onChange={inputValue => setHourlyRate(inputValue)}
      />
      <BouncyInput
        id="commission"
        label="Commission"
        initialValue={commission}
        placeholder="Commission"
        type="number"
        onChange={inputValue => setCommission(inputValue)}
        step={0.01}
      />
      <BouncyInput
        id="tax"
        label="Tax"
        initialValue={tax}
        placeholder="Tax"
        type="number"
        onChange={inputValue => setTax(inputValue)}
        step={0.01}
      />
      <BouncyInput
        id="non-commissioned-hours"
        label="Non-commissioned hours"
        initialValue={nonCommissionedHours}
        placeholder="Non-commissioned hours"
        type="number"
        onChange={inputValue => setNonCommissionedHours(inputValue)}
      />
    </div>
  );
}
