import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui";
import * as React from "react";
import FeedbackForm from "./feedbackForm";

const FeedbackDialog = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="black">Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Feedback</DialogTitle>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
