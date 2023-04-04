"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userProfileSchema } from "@/lib/validations/user";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateJobOfferFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User;
}

type FormData = z.infer<typeof userProfileSchema>;

function UserProfileForm({ user, className, ...other }: CreateJobOfferFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const isLoading = useMemo(() => isPending || isSaving, [isPending, isSaving]);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name
    }
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive"
      });
    }

    toast({
      description: "Profile updated has been updated.",
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
      <div className="w-full max-w-[400px]">
        <Label htmlFor="name">Name</Label>
        <Input id="name" disabled={isLoading} className="w-full" {...register("name")} />
        {errors?.name && <p className="px-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <Button className="mt-4 w-fit" type="submit" disabled={isLoading} variant="subtle">
        <span>Save</span>
        <Show when={!isLoading}>
          <Icons.Check className="ml-2 h-4 w-4" />
        </Show>
        <Show when={isLoading}>
          <Icons.Loader className="ml-2 h-4 w-4" />
        </Show>
      </Button>
    </form>
  );
}

const UserProfileFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex h-[64px] w-full max-w-[400px] flex-col justify-between">
        <Skeleton className="mt-1 h-[17px] w-24" />
        <Skeleton className="h-[40px] w-full" />
      </div>
      <ButtonSkeleton className="mt-4 w-fit" />
    </div>
  );
};

export { UserProfileForm, UserProfileFormSkeleton };
