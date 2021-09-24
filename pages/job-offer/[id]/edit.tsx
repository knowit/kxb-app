import Button from "@/components/button";
import Container from "@/components/container";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import TextField from "@/components/textField";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";
import { useForm, useFormState } from "react-hook-form";
import useSWR from "swr";

export default function EditJobOffer({ id, initialJobOffer }) {
  const { data: jobOffer } = useSWR(`/api/job-offer/${id}`, { fallbackData: initialJobOffer });

  const { register, control, handleSubmit } = useForm();
  const { errors } = useFormState({ control });

  const onSubmit = async data => {
    const response = await fetch(`/api/job-offer/${id}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  const onDelete = async () => {
    const response = await fetch(`/api/job-offer/${id}`, {
      method: "DELETE",
      cache: "no-cache"
    });
  };

  return (
    <>
      <Heading variant="pageHeading">Job offer</Heading>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="firstName"
              label="First name"
              placeholder="John"
              error={errors.firstName}
              defaultValue={jobOffer.firstName}
              {...register("firstName", {
                required: true
              })}
            />
            <TextField
              id="lastName"
              label="Last name"
              placeholder="Doe"
              error={errors.lastName}
              defaultValue={jobOffer.lastName}
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
              defaultValue={jobOffer.email}
              {...register("email", {
                required: true
              })}
            />
            <TextField
              id="phone"
              label="Phone"
              placeholder="999 88 777"
              error={errors.phone}
              defaultValue={jobOffer.phone}
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
              defaultValue={jobOffer.hourlyRate}
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
              defaultValue={jobOffer.commission}
              step="0.01"
              error={errors.commission}
              {...register("commission", {
                required: true
              })}
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit">Update job offer</Button>
            <Button variant="delete" onClick={async () => onDelete()}>
              Delete job offer
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const authenticatedPageProps = await getResultForAuthenticatedPage(context);
  const jobOffer = [];

  return {
    props: {
      ...authenticatedPageProps.props,
      id: context.params.id,
      initialJobOffer: jobOffer
    }
  };
};

EditJobOffer.layoutProps = {
  meta: {
    title: "Job offer"
  },
  Layout: AuthenticatedLayout
};
