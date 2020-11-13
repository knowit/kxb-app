import * as React from "react";
import BouncyInput from "../components/bouncyInput";
import { Flex } from "../components/flex";

export const calculateEarningsInputsDefaultOptions = {
  workHoursPerDay: 7.5,
  hourlyRate: 1250,
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
    <Flex flexDirection="column">
      <BouncyInput
        id="work-hours-per-day"
        label="Arbeidstimer per dag"
        initialValue={workHoursPerDay}
        placeholder="Arbeidstimer per dag"
        type="number"
        onChange={inputValue => setWorkHoursPerDay(inputValue)}
      />
      <BouncyInput
        id="hourly-rate"
        label="Timesats"
        initialValue={hourlyRate}
        placeholder="Timesats"
        type="number"
        onChange={inputValue => setHourlyRate(inputValue)}
      />
      <BouncyInput
        id="commission"
        label="Provisjon"
        initialValue={commission}
        placeholder="Provisjon"
        type="number"
        onChange={inputValue => setCommission(inputValue)}
        step={0.01}
      />
      <BouncyInput
        id="tax"
        label="Skatteprosent"
        initialValue={tax}
        placeholder="Skatteprosent"
        type="number"
        onChange={inputValue => setTax(inputValue)}
        step={0.01}
      />
      <BouncyInput
        id="non-commissioned-hours"
        label="Ikke fakturerbare timer"
        initialValue={nonCommissionedHours}
        placeholder="Ikke fakturerbare timer"
        type="number"
        onChange={inputValue => setNonCommissionedHours(inputValue)}
      />
    </Flex>
  );
}
