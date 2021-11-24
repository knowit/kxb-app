import {
  AppearInBox,
  Button,
  Checkbox,
  CheckboxIndicator,
  Flex,
  Form,
  IconButton,
  Label,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Svg,
  Text,
  TextField
} from "@/components/ui";
import { useUser } from "@/components/user/hooks";
import EARNING_CONSTANTS from "@/constants/earningConstants";
import { UserWorkDayDetail } from "@/types";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCheckmark, IoInformationCircleOutline } from "react-icons/io5";

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

  const isNonCommissionedToggled = React.useMemo(
    () => nonCommissionedHours > 0,
    [nonCommissionedHours]
  );

  const { userNonCommissionedHours, userExtraHours, userSickDay } = React.useMemo(() => {
    const workDayDetail = user.workDayDetails?.find(
      workDayDetail => workDayDetail.date === day.formattedDate
    );

    return {
      userNonCommissionedHours: +(workDayDetail?.nonCommissionedHours ?? 0),
      userExtraHours: +(workDayDetail?.extraHours ?? 0),
      userSickDay: workDayDetail?.sickDay ?? false
    };
  }, [user.workDayDetails, day.formattedDate]);

  console.log(userSickDay);

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
                {...register("nonCommissionedHours", {
                  required: true
                })}
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
              <Flex css={{ alignItems: "center" }}>
                <Controller
                  name="sickDay"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="sickDay"
                      value={field.value}
                      checked={field.value}
                      onCheckedChange={checked => field.onChange(checked)}
                      ref={field.ref}
                    >
                      <CheckboxIndicator>
                        <IoCheckmark />
                      </CheckboxIndicator>
                    </Checkbox>
                  )}
                ></Controller>
                <Label
                  textTransform="uppercase"
                  htmlFor="sickDay"
                  size="1"
                  css={{ paddingLeft: "$3" }}
                >
                  Send as sick hours?
                </Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <IconButton
                      type="button"
                      variant="textDark"
                      size="1"
                      css={{ marginLeft: "$2" }}
                    >
                      <Svg as={IoInformationCircleOutline} variant="textDark" />
                    </IconButton>
                  </PopoverTrigger>
                  <PopoverContent
                    variant="gray"
                    css={{
                      maxWidth: "200px"
                    }}
                  >
                    <Text>
                      Sick leave or self-reported sickness grants payment upward limited to 6G.
                    </Text>
                    <PopoverArrow variant="gray" offset={11} />
                  </PopoverContent>
                </Popover>
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
          {...register("extraHours", {
            required: true
          })}
          fieldContainerCss={{
            marginBottom: "0"
          }}
        />
      </Flex>
    </Form>
  );
}
