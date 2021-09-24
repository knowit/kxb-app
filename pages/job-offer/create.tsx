import Button from "@/components/button";
import Container from "@/components/container";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import Text from "@/components/text";
import TextField from "@/components/textField";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";
import { useForm, useFormState } from "react-hook-form";

export default function CreateJobOffer() {
  const { register, control, handleSubmit } = useForm();
  const { errors } = useFormState({ control });

  const onSubmit = async data => {
    const response = await fetch("/api/job-offer", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  return (
    <>
      <Heading variant="pageHeading">Create job offer</Heading>
      <Text>Click the button below to start creating the job offer</Text>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="firstName"
              label="First name"
              placeholder="John"
              error={errors.firstName}
              {...register("firstName", {
                required: true
              })}
            />
            <TextField
              id="lastName"
              label="Last name"
              placeholder="Doe"
              error={errors.lastName}
              {...register("lastName", {
                required: true
              })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="email"
              label="Email"
              placeholder="john.doe@email.com"
              error={errors.email}
              {...register("email", {
                required: true
              })}
            />
            <TextField
              id="phone"
              label="Phone"
              placeholder="999 88 777"
              error={errors.phone}
              {...register("phone", {
                required: true
              })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="hourlyRate"
              label="Hourly rate"
              placeholder="1150"
              type="number"
              defaultValue="1150"
              step="50"
              error={errors.hourlyRate}
              {...register("hourlyRate", {
                required: true
              })}
            />
            <TextField
              id="commission"
              label="Commission"
              placeholder="0.40"
              type="number"
              defaultValue="0.40"
              step="0.01"
              error={errors.commission}
              {...register("commission", {
                required: true
              })}
            />
          </div>

          <Button type="submit">Create job offer</Button>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

CreateJobOffer.layoutProps = {
  meta: {
    title: "Create job offer"
  },
  Layout: AuthenticatedLayout
};
