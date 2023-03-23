"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { SITE_CONSTANTS } from "@/constants/site-constants";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userFeedbackSchema } from "@/lib/validations/user";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Flex } from "../ui/flex";
import { Label } from "../ui/label";
import { Show } from "../ui/show";
import { Skeleton } from "../ui/skeleton";
import { TextArea } from "../ui/text-area";

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
    <Flex className="mt-3 h-[34px] leading-relaxed" gap="3">
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

export function UserFeedbackForm({ user, className, ...other }: UserFeedbackFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
  const [isSaving, setIsSaving] = useState<boolean>(false);

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
        <Label htmlFor="feedback">Feedback</Label>
        <TextArea
          id="feedback"
          className="w-full resize-none scroll-py-2"
          autoComplete="off"
          autoCorrect="off"
          {...register("feedback")}
        />
        {errors?.feedback && (
          <p className="mt-2 px-1 text-xs text-red-600">{errors.feedback.message}</p>
        )}
      </div>
      <div>
        <FeedbackEmojiSelector onSelected={emojiValue => setValue("reaction", emojiValue)} />
      </div>
      <Button className="mt-4" type="submit" disabled={isSaving || isPending} variant="subtle">
        <span>Send</span>
        <Show when={!isSaving && !isPending}>
          <Icons.PaperPlane className="ml-2 h-4 w-4" />
        </Show>
        <Show when={isSaving || isPending}>
          <Icons.Loader className="ml-2 h-4 w-4" />
        </Show>
      </Button>
    </form>
  );
}

const UserFeedbackFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex h-[36px] items-center gap-3">
        <Skeleton className="h-[20px] w-[20px] rounded-none" />
        <Skeleton className="h-[20px] w-44" />
        <Skeleton className="h-[20px] w-[20px]" />
      </div>
      <div className="flex h-[36px] items-center gap-3">
        <Skeleton className="h-[20px] w-[20px] rounded-none" />
        <Skeleton className="h-[20px] w-48" />
        <Skeleton className="h-[20px] w-[20px]" />
      </div>
      <ButtonSkeleton className="mt-4" />
    </div>
  );
};

export { UserFeedbackFormSkeleton };
