import Button from "@/components/button";
import TextField from "@/components/textField";
import { useUser } from "@/components/user/hooks";
import EARNING_CONSTANTS from "@/constants/earningConstants";
import * as React from "react";
import { useForm } from "react-hook-form";

export default function UserWorkDayDetails({ day }) {
  const { user, update } = useUser();
  const { register, setValue, watch } = useForm();

  const { nonCommissionedHours, extraHours } = watch();

  const isNonCommissionedToggled = React.useMemo(
    () => nonCommissionedHours > 0,
    [nonCommissionedHours]
  );

  React.useEffect(() => {
    setValue(
      "nonCommissionedHours",
      user.workDayDetails?.[day.formattedDate]?.nonCommissionedHours ?? 0
    );
    setValue("extraHours", user.workDayDetails?.[day.formattedDate]?.extraHours ?? 0);
  }, [user.workDayDetails, day.formattedDate, setValue]);

  React.useEffect(() => {
    async function persistUser() {
      if (
        nonCommissionedHours !== null &&
        extraHours !== null &&
        nonCommissionedHours !== undefined &&
        extraHours !== undefined &&
        (user.workDayDetails?.[day.formattedDate]?.nonCommissionedHours !== nonCommissionedHours ||
          user.workDayDetails?.[day.formattedDate]?.extraHours !== extraHours)
      ) {
        update({
          workDayDetails: {
            ...(user?.workDayDetails ?? {}),
            [day.formattedDate]: {
              nonCommissionedHours: Math.max(0, +nonCommissionedHours),
              extraHours: Math.max(0, +extraHours)
            }
          }
        });
      }
    }

    persistUser();
  }, [user.workDayDetails, nonCommissionedHours, extraHours, day.formattedDate, update]);

  return (
    <form>
      <div className="flex flex-col">
        {day.isWorkDay ? (
          <div className="flex gap-4 items-center">
            <TextField
              id="nonCommissionedHours"
              label="Non commissioned hours"
              labelProps={{
                className: "text-xs"
              }}
              placeholder="0"
              type="number"
              step="0.5"
              min="0"
              disabled={+extraHours > 0}
              {...register("nonCommissionedHours", {
                required: true
              })}
            />
            <Button
              className="min-w-[75px] disabled:opacity-50 disabled:cursor-not-allowed"
              variant={isNonCommissionedToggled ? "red" : "primary"}
              disabled={+extraHours > 0}
              onClick={() =>
                setValue("nonCommissionedHours", isNonCommissionedToggled ? "0" : "7.5")
              }
            >
              {isNonCommissionedToggled
                ? `-${nonCommissionedHours}`
                : `+${EARNING_CONSTANTS.WORK_HOURS_PER_DAY}`}
            </Button>
          </div>
        ) : null}
        <TextField
          id="extraHours"
          label="Extra hours"
          labelProps={{
            className: "text-xs"
          }}
          placeholder="0"
          type="number"
          step="0.5"
          min="0"
          disabled={+nonCommissionedHours > 0}
          {...register("extraHours", {
            required: true
          })}
        />
      </div>
    </form>
  );
}
