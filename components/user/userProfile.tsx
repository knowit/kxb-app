import { Box, Form, Heading, TextField } from "@/components/ui";
import { useUser } from "@/components/user/hooks";
import * as React from "react";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { user, update } = useUser();
  const { register, setValue, watch } = useForm();

  const { hourlyRate, commission, tax, workHours } = watch();

  React.useEffect(() => {
    setValue("hourlyRate", user?.hourlyRate);
    setValue("commission", user?.commission);
    setValue("tax", user?.tax);
    setValue("workHours", user?.workHours);
  }, [user, setValue]);

  React.useEffect(() => {
    const newHourlyRate = +(hourlyRate ?? user?.hourlyRate ?? 0);
    const newCommission = +(commission ?? user?.commission ?? 0);
    const newTax = +(tax ?? user?.tax ?? 0);
    const newWorkHours = +(workHours ?? user?.workHours ?? 0);

    async function persistUser() {
      if (
        user &&
        newHourlyRate > 0 &&
        newCommission > 0 &&
        newTax > 0 &&
        newWorkHours > 0 &&
        (newHourlyRate !== user.hourlyRate ||
          newCommission !== user.commission ||
          newTax !== user.tax ||
          newWorkHours !== user.workHours)
      ) {
        await update({
          hourlyRate: newHourlyRate,
          commission: newCommission,
          tax: newTax,
          workHours: newWorkHours
        });
      }
    }

    persistUser();
  }, [user, hourlyRate, commission, tax, workHours, update]);

  return (
    <Box>
      <Heading>Your salary settings</Heading>
      <Form>
        <TextField
          id="hourlyRate"
          label="Hourly rate"
          placeholder="1150"
          type="number"
          {...register("hourlyRate", {
            required: true
          })}
        />
        <TextField
          id="commission"
          label="Commission"
          placeholder="0.45"
          type="number"
          step="0.01"
          {...register("commission", {
            required: true
          })}
        />
        <TextField
          id="tax"
          label="Tax"
          placeholder="0.41"
          type="number"
          step="0.01"
          {...register("tax", {
            required: true
          })}
        />
        <TextField
          id="workHours"
          label="Work hours per day"
          placeholder="7.5"
          type="number"
          step="0.5"
          info="The normal amount is 7.5 hours per day, but some consultants get their lunches covered by their employers i.e. their work hours per day will be 8 hours."
          {...register("workHours", {
            required: true
          })}
        />
      </Form>
    </Box>
  );
};

export default UserProfile;
