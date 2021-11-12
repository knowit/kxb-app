import { Button, Fieldset, Flex, Form, Svg, Text, TextArea } from "@/components/ui";
import { useUser } from "@/components/user";
import * as React from "react";
import { useForm } from "react-hook-form";
import { IoCheckmark, IoChevronForward, IoSyncOutline } from "react-icons/io5";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    await fetch("/api/user/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    setIsSubmitting(false);
    setIsCompleted(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <TextArea
          id="message"
          label="Your feedback"
          error={errors.message !== undefined}
          helperText="The field is required"
          {...register("message", {
            required: true
          })}
        />
      </Fieldset>
      <Fieldset></Fieldset>
      <Flex>
        <input type="radio" value="1" {...register("developer", { required: true })} />
        <input type="radio" value="2" {...register("developer", { required: true })} />
      </Flex>
      <Button type="submit" disabled={isSubmitting || isCompleted}>
        <Text>{isSubmitting ? "Sender..." : isCompleted ? "Sendt" : "Send inn"}</Text>
        <Svg
          as={isSubmitting ? IoSyncOutline : isCompleted ? IoCheckmark : IoChevronForward}
          size="2"
          css={{
            ml: "$2"
          }}
          spin={isSubmitting}
        />
      </Button>
    </Form>
  );
};

export default FeedbackForm;
