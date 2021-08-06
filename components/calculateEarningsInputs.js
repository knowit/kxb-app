import TextField from "@/components/textField";
import { useSalary } from "@/utils/salaryProvider";
import * as React from "react";

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
