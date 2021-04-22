import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Heading from "../components/heading";
import Text from "../components/text";
import TextField from "../components/textField";
import { useUser } from "../components/user";

export default function Profile() {
  const { user, update } = useUser();
  const { register, handleSubmit, setValue } = useForm({});

  React.useEffect(() => {
    setValue("hourlyRate", user?.hourlyRate);
    setValue("commission", user?.commission);
    setValue("tax", user?.tax);
  }, [user]);

  const onSubmit = async data => {
    await update({
      hourlyRate: +data.hourlyRate,
      commission: +data.commission,
      tax: +data.tax
    });
  };

  return (
    <>
      <Heading variant="pageHeading">Hi {user?.name}</Heading>
      <Text>To edit your settings, use the form below.</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">Update</Button>
      </form>
    </>
  );
}
