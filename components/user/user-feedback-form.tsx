"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Label } from "@/components/ui/label";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import { TextArea } from "@/components/ui/text-area";
import { SITE_CONSTANTS } from "@/constants/site-constants";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userFeedbackSchema } from "@/lib/validations/user";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserFeedbackFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User;
}

type FormData = z.infer<typeof userFeedbackSchema>;

const FeedbackEmojiSelector = ({
  onSelected = () => {}
}: {
  onSelected: (emojiValue: number) => void;
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<number>(0);

  const handleEmojiSelect = (emojiValue: number) => {
    setSelectedEmoji(emojiValue);
    onSelected?.(emojiValue);
  };

  return (
    <Flex className="h-[34px]" gap="3">
      {Object.entries(SITE_CONSTANTS.EMOJIS).map(([emoji, { src, alt, value }]) => (
        <Button
          className={cn("h-[34px] w-[34px] rounded-full p-0 transition-transform hover:scale-110", {
            "scale-110 dark:border-neutral-200": selectedEmoji === value
          })}
          type="button"
          variant="outline"
          key={`emoji-button-twemoji-${emoji}`}
          onClick={() => handleEmojiSelect(value)}
        >
          <Image src={src} alt={alt} width={24} height={24} decoding="async" />
        </Button>
      ))}
    </Flex>
  );
};

function UserFeedbackForm({ user, className, ...other }: UserFeedbackFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const isLoading = useMemo(() => isPending || isSaving, [isPending, isSaving]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(userFeedbackSchema),
    defaultValues: {
      date: new Date().toISOString(),
      userId: user.id,
      reaction: 2
    }
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/user/${user.id}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: data.date,
        feedback: data.feedback,
        userId: data.userId,
        reaction: data.reaction
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your feedback was not saved. Please try again.",
        variant: "destructive"
      });
    }

    toast({
      description: "Your feedback has been saved. Thank you!",
      duration: 5000,
      variant: "success"
    });

    // TODO: Enable email after testing with SendGrid
    // await fetch(`/api-v2/user/${user.id}/feedback/email`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     date: data.date,
    //     feedback: data.feedback,
    //     userId: data.userId,
    //     reaction: data.reaction
    //   })
    // });

    // start transition
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <form
      className={cn("flex flex-col gap-y-2", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      <div>
        <Label htmlFor="feedback">Your feedback</Label>
        <TextArea
          id="feedback"
          className="w-full resize-none scroll-py-2"
          autoComplete="off"
          autoCorrect="off"
          disabled={isLoading}
          {...register("feedback")}
        />
        {errors?.feedback && (
          <p className="mt-2 px-1 text-xs text-red-600">{errors.feedback.message}</p>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <FeedbackEmojiSelector onSelected={emojiValue => setValue("reaction", emojiValue)} />
        <Button type="submit" disabled={isLoading} variant="subtle">
          <span>Send</span>
          <Show when={!isLoading}>
            <Icons.PaperPlane className="ml-2 h-4 w-4" />
          </Show>
          <Show when={isLoading}>
            <Icons.Loader className="ml-2 h-4 w-4" />
          </Show>
        </Button>
      </div>
    </form>
  );
}

const UserFeedbackFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="h-[104px]">
        <Skeleton className="mb-1 h-[17px] w-1/4" />
        <Skeleton className="h-[80px] w-full" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex h-[34px] gap-3">
          {Object.entries(SITE_CONSTANTS.EMOJIS).map(([emoji, { src, alt }]) => (
            <ButtonSkeleton
              className="h-[34px] w-[34px] rounded-full p-0"
              key={`emoji-button-twemoji-${emoji}`}
            />
          ))}
        </div>
        <ButtonSkeleton className="w-24" />
      </div>
    </div>
  );
};

export { UserFeedbackForm, UserFeedbackFormSkeleton };
