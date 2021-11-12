import { Button, Dialog, DialogContent, DialogTrigger, Heading } from "@/components/ui";
import * as React from "react";
import FeedbackForm from "./feedbackForm";

const FeedbackDialog = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="black">Feedback</Button>
      </DialogTrigger>
      <DialogContent
        css={{
          "@bp2": {
            minWidth: "$mdContainer"
          },
          maxWidth: "$mdContainer"
        }}
      >
        <Heading size="3" mb="4">
          Feedback
        </Heading>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
