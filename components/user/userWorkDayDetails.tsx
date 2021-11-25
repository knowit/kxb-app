import {
  AppearInBox,
  Button,
  Flex,
  Form,
  InfoButton,
  Link,
  Text,
  TextField
} from "@/components/ui";
import { useUser } from "@/components/user/hooks";
import EARNING_CONSTANTS from "@/constants/earningConstants";
import { UserWorkDayDetail } from "@/types";
import * as React from "react";
import { useForm } from "react-hook-form";
import { ControlledCheckbox } from "../form";

function upsertWorkDayDetail(
  workDayDetails: UserWorkDayDetail[] = [],
  workDayDetail: UserWorkDayDetail
): UserWorkDayDetail[] {
  if (!workDayDetail) {
    return workDayDetails;
  }

  const newWorkDayDetails = [...workDayDetails];

  const i = workDayDetails.findIndex(item => item.date === workDayDetail.date);

  if (i === -1) {
    newWorkDayDetails.push(workDayDetail);
    return newWorkDayDetails;
  }

  return newWorkDayDetails.map(item => {
    if (item.date === workDayDetail.date) {
      return {
        ...item,
        nonCommissionedHours: workDayDetail.nonCommissionedHours,
        extraHours: workDayDetail.extraHours,
        sickDay: workDayDetail.sickDay
      };
    }

    return { ...item };
  });
}

export default function UserWorkDayDetails({ day }) {
  const { user, update } = useUser();
  const { register, setValue, watch, control } = useForm();

  const { nonCommissionedHours, extraHours, sickDay } = watch();

  const workDayDetail = React.useMemo(
    () => user?.workDayDetails?.find(workDayDetail => workDayDetail.date === day.formattedDate),
    [user?.workDayDetails, day.formattedDate]
  );

  const isNonCommissionedToggled = React.useMemo(
    () => (workDayDetail?.nonCommissionedHours ?? 0) > 0,
    [workDayDetail?.nonCommissionedHours]
  );

  const { userNonCommissionedHours, userExtraHours, userSickDay } = React.useMemo(() => {
    return {
      userNonCommissionedHours: +(workDayDetail?.nonCommissionedHours ?? 0),
      userExtraHours: +(workDayDetail?.extraHours ?? 0),
      userSickDay: workDayDetail?.sickDay ?? false
    };
  }, [workDayDetail]);

  React.useEffect(() => {
    setValue("nonCommissionedHours", userNonCommissionedHours);
    setValue("extraHours", userExtraHours);
    setValue("sickDay", userSickDay);
  }, [userNonCommissionedHours, userExtraHours, userSickDay, day.formattedDate, setValue]);

  React.useEffect(() => {
    async function persistUser() {
      if (
        extraHours !== undefined &&
        nonCommissionedHours !== undefined &&
        sickDay !== undefined &&
        (nonCommissionedHours !== userNonCommissionedHours ||
          extraHours !== userExtraHours ||
          sickDay !== userSickDay)
      ) {
        const minZeroFixedExtraHours = Math.max(0, +(extraHours ?? 0));
        const minZeroFixedNonCommissionedHours = Math.max(0, +(nonCommissionedHours ?? 0));

        await update({
          workDayDetails: upsertWorkDayDetail(user?.workDayDetails ?? [], {
            id: 0,
            date: day.formattedDate,
            extraHours: minZeroFixedExtraHours,
            sickDay: minZeroFixedNonCommissionedHours > 0 && sickDay,
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
    userSickDay,
    nonCommissionedHours,
    extraHours,
    sickDay,
    day.formattedDate,
    update
  ]);

  return (
    <Form>
      <Flex direction="column">
        {day.isWorkDay ? (
          <>
            <Flex gap="3" alignItems="center">
              <TextField
                id="nonCommissionedHours"
                label="Non commissioned hours"
                placeholder="0"
                type="number"
                step="0.5"
                min="0"
                disabled={+extraHours > 0}
                {...register("nonCommissionedHours")}
                labelSize="1"
                css={{
                  maxWidth: "110px"
                }}
                fieldContainerCss={{
                  marginBottom: "0"
                }}
              />
              <Button
                type="button"
                variant={isNonCommissionedToggled ? "red" : "green"}
                disabled={+extraHours > 0}
                onClick={() =>
                  setValue("nonCommissionedHours", isNonCommissionedToggled ? "0" : "7.5")
                }
                css={{
                  maxWidth: "60px",
                  fontSize: "$2",
                  alignSelf: "flex-end",
                  height: "37px",
                  marginBottom: "6px"
                }}
              >
                {isNonCommissionedToggled
                  ? `-${nonCommissionedHours}`
                  : `+${EARNING_CONSTANTS.WORK_HOURS_PER_DAY}`}
              </Button>
            </Flex>
            <AppearInBox
              appear={isNonCommissionedToggled}
              css={{
                marginBottom: "$3"
              }}
            >
              <Flex css={{ alignItems: "center", marginTop: "$2", position: "relative" }}>
                <ControlledCheckbox
                  control={control}
                  name="sickDay"
                  id="sickDay"
                  labelText="Send as sick hours?"
                />
                <InfoButton popoverSide="right">
                  <Text>
                    Sick leave or self-reported sickness grants payment upward limited to 6G. You
                    can read more in our{" "}
                    <Link
                      href="https://handbooks.simployer.com/nb-no/article/100139"
                      color="green"
                      textDecoration="underline"
                      isExternal
                    >
                      personal handbook
                    </Link>
                    .
                  </Text>
                </InfoButton>
              </Flex>
            </AppearInBox>
          </>
        ) : null}
        <TextField
          id="extraHours"
          label="Extra hours"
          placeholder="0"
          type="number"
          step="0.5"
          min="0"
          disabled={+nonCommissionedHours > 0}
          labelSize="1"
          {...register("extraHours")}
          fieldContainerCss={{
            marginBottom: "0"
          }}
        />
      </Flex>
    </Form>
  );
}
