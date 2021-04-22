import * as React from "react";
import { useSalary } from "../utils/salaryProvider";
import TextField from "./textField";

export default function CalculateEarningsInputs() {
  const { setNonCommissionedHours } = useSalary();

  return (
    <div className="flex flex-col">
      <form>
        <TextField
          id="nonCommissionedHours"
          label="Non-commissioned hours"
          placeholder="0"
          type="number"
          onChange={e => setNonCommissionedHours(+e.target.value)}
        />
      </form>
    </div>
  );
}
