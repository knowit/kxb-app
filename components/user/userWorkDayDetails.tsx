import Button from "@/components/button";
import TextField from "@/components/textField";
import { useUser } from "@/components/user/hooks";
import EARNING_CONSTANTS from "@/constants/earningConstants";
import { UserWorkDayDetail } from "@/types";
import * as React from "react";
import { useForm } from "react-hook-form";

function upsertWorkDayDetail(
  workDayDetails: UserWorkDayDetail[] = [],
  workDayDetail: UserWorkDayDetail
): UserWorkDayDetail[] {
  if (!workDayDetail) {
    return workDayDetails;
  }

  const i = workDayDetails.findIndex(item => item.date === workDayDetail.date);

  if (i === -1) {
    workDayDetails.push(workDayDetail);
    return workDayDetails;
  }

  return workDayDetails.map(item => {
    if (item.date === workDayDetail.date) {
      return {
        ...item,
        nonCommissionedHours: workDayDetail.nonCommissionedHours,
        extraHours: workDayDetail.extraHours
      };
    }

    return { ...item };
  });
}

export default function UserWorkDayDetails({ day }) {
  const { user, update } = useUser();
  const { register, setValue, watch } = useForm();

  const { nonCommissionedHours, extraHours } = watch();

  const isNonCommissionedToggled = React.useMemo(
    () => nonCommissionedHours > 0,
    [nonCommissionedHours]
  );

  const { userNonCommissionedHours, userExtraHours } = React.useMemo(() => {
    const workDayDetail = user.workDayDetails?.find(
      workDayDetail => workDayDetail.date === day.formattedDate
    );

    return {
      userNonCommissionedHours: +(workDayDetail?.nonCommissionedHours ?? 0),
      userExtraHours: +(workDayDetail?.extraHours ?? 0)
    };
  }, [user.workDayDetails, day.formattedDate]);

  React.useEffect(() => {
    setValue("nonCommissionedHours", userNonCommissionedHours);
    setValue("extraHours", userExtraHours);
  }, [userNonCommissionedHours, userExtraHours, day.formattedDate, setValue]);

  React.useEffect(() => {
    async function persistUser() {
      if (
        extraHours !== undefined &&
        nonCommissionedHours !== undefined &&
        (nonCommissionedHours !== userNonCommissionedHours || extraHours !== userExtraHours)
      ) {
        const minZeroFixedExtraHours = Math.max(0, +(extraHours ?? 0));
        const minZeroFixedNonCommissionedHours = Math.max(0, +(nonCommissionedHours ?? 0));

        await update({
          workDayDetails: upsertWorkDayDetail(user?.workDayDetails ?? [], {
            id: 0,
            date: day.formattedDate,
            extraHours: minZeroFixedExtraHours,
            nonCommissionedHours: minZeroFixedNonCommissionedHours,
            userId: 0
          })
        });
      }
    }

    persistUser();
  }, [
    user,
    userNonCommissionedHours,
    userExtraHours,
    nonCommissionedHours,
    extraHours,
    day.formattedDate,
    update
  ]);

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
