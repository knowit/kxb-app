import TextField from "@/components/textField";
import { useUser } from "@/components/user/hooks";
import * as React from "react";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { user, update } = useUser();
  const { register, setValue, watch } = useForm();

  const { hourlyRate, commission, tax } = watch();

  React.useEffect(() => {
    setValue("hourlyRate", user?.hourlyRate);
    setValue("commission", user?.commission);
    setValue("tax", user?.tax);
  }, [user, setValue]);

  React.useEffect(() => {
    const newHourlyRate = +(hourlyRate ?? user?.hourlyRate ?? 0);
    const newCommission = +(commission ?? user?.commission ?? 0);
    const newTax = +(tax ?? user?.tax ?? 0);

    async function persistUser() {
      if (
        user &&
        newHourlyRate > 0 &&
        newCommission > 0 &&
        newTax > 0 &&
        (newHourlyRate !== user.hourlyRate ||
          newCommission !== user.commission ||
          newTax !== user.tax)
      ) {
        await update({
          hourlyRate: newHourlyRate,
          commission: newCommission,
          tax: newTax
        });
      }
    }

    persistUser();
  }, [user, hourlyRate, commission, tax, update]);

  return (
    <form>
      <TextField
        id="hourlyRate"
        label="Hourly rate"
        placeholder="1150"
        type="number"
        defaultValue={user.hourlyRate}
        {...register("hourlyRate", {
          required: true
        })}
      />
      <TextField
        id="commission"
        label="Commission"
        placeholder="0.40"
        type="number"
        step="0.01"
        defaultValue={user.commission}
        {...register("commission", {
          required: true
        })}
      />
      <TextField
        id="tax"
        label="Tax"
        placeholder="0.36"
        type="number"
        step="0.01"
        defaultValue={user.tax}
        {...register("tax", {
          required: true
        })}
      />
    </form>
  );
};

export default UserProfile;
