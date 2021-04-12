import * as React from "react";
import { useSalary } from "../utils/salaryProvider";
import TextField from "./textField";

export default function CalculateEarningsInputs() {
  const {
    workHoursPerDay,
    hourlyRate,
    commission,
    tax,
    nonCommissionedHours,
    setWorkHoursPerDay,
    setHourlyRate,
    setCommission,
    setTax,
    setNonCommissionedHors
  } = useSalary();

  return (
    <div className="flex flex-col">
      <TextField
        id="work-hours-per-day"
        label="Work hours per day"
        initialValue={workHoursPerDay}
        placeholder="Work hours per day"
        type="number"
        onChange={inputValue => setWorkHoursPerDay(inputValue)}
      />
      <TextField
        id="hourly-rate"
        label="Hourly rate"
        initialValue={hourlyRate}
        placeholder="Hourly rate"
        type="number"
        onChange={inputValue => setHourlyRate(inputValue)}
      />
      <TextField
        id="commission"
        label="Commission"
        initialValue={commission}
        placeholder="Commission"
        type="number"
        onChange={inputValue => setCommission(inputValue)}
        step={0.01}
      />
      <TextField
        id="tax"
        label="Tax"
        initialValue={tax}
        placeholder="Tax"
        type="number"
        onChange={inputValue => setTax(inputValue)}
        step={0.01}
      />
      <TextField
        id="non-commissioned-hours"
        label="Non-commissioned hours"
        initialValue={nonCommissionedHours}
        placeholder="Non-commissioned hours"
        type="number"
        onChange={inputValue => setNonCommissionedHors(inputValue)}
      />
    </div>
  );
}
