"use client";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { InfoButton } from "@/components/ui/info-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import EARNING_CONSTANTS from "@/constants/earning-constants";
import { cn } from "@/lib/utils";
import { userSalaryDetailSchema } from "@/lib/validations/user";
import { useState, useTransition, type HTMLAttributes } from "react";

interface UserSalaryDetailsFormProps extends HTMLAttributes<HTMLFormElement> {
  user: {
    id: user["id"];
    commission: number;
    hourlyRate: number;
    tax: number;
    workHours: number;
  };
  onFormSubmitSuccess?: () => void;
}

type FormData = z.infer<typeof userSalaryDetailSchema>;

export function UserSalaryDetailsForm({
  user,
  className,
  onFormSubmitSuccess,
  ...other
}: UserSalaryDetailsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userSalaryDetailSchema),
    defaultValues: {
      commission: user.commission,
      hourlyRate: user.hourlyRate,
      tax: user.tax,
      workHours: user.workHours
    }
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commission: data.commission,
        hourlyRate: data.hourlyRate,
        tax: data.tax,
        workHours: data.workHours
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your salary details was not updated. Please try again.",
        variant: "destructive"
      });
    }

    toast({
      description: "Your salary details has been updated.",
      duration: 5000,
      variant: "success"
    });

    // start transition
    startTransition(() => {
      onFormSubmitSuccess?.();
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
        <Label htmlFor="name">Hourly rate</Label>
        <Input
          id="name"
          type="number"
          className="w-full"
          size={32}
          {...register("hourlyRate", {
            valueAsNumber: true
          })}
        />
        {errors?.hourlyRate && (
          <p className="px-1 text-xs text-red-600">{errors.hourlyRate.message}</p>
        )}
      </div>
      <div className="w-full max-w-[400px]">
        <Label htmlFor="name">Commission</Label>
        <Input
          id="name"
          type="number"
          step="0.01"
          className="w-full"
          size={32}
          {...register("commission", {
            valueAsNumber: true
          })}
        />
        {errors?.commission && (
          <p className="px-1 text-xs text-red-600">{errors.commission.message}</p>
        )}
      </div>
      <div className="w-full max-w-[400px]">
        <Label htmlFor="name">Tax</Label>
        <Input
          id="name"
          type="number"
          step="0.01"
          className="w-full"
          size={32}
          {...register("tax", {
            valueAsNumber: true
          })}
        />
        {errors?.tax && <p className="px-1 text-xs text-red-600">{errors.tax.message}</p>}
      </div>
      <div className="w-full max-w-[400px]">
        <div className="flex items-center justify-between">
          <Label htmlFor="name">Work hours</Label>
          <InfoButton size="sm">
            The standard work hours for consultants is {EARNING_CONSTANTS.WORK_HOURS_PER_DAY} hours
            per day. However, some consultants may have their lunch covered by their employers,
            which means their work hours per day will be 8 hours.
          </InfoButton>
        </div>
        <Input
          id="name"
          type="number"
          step="0.5"
          className="w-full"
          size={32}
          {...register("workHours", {
            valueAsNumber: true
          })}
        />
        {errors?.workHours && (
          <p className="px-1 text-xs text-red-600">{errors.workHours.message}</p>
        )}
      </div>
      <Button className="mt-4" type="submit" disabled={isSaving || isPending} variant="subtle">
        <span>Save</span>
        <Show when={!isSaving && !isPending}>
          <Icons.Check className="ml-2 h-4 w-4" />
        </Show>
        <Show when={isSaving || isPending}>
          <Icons.Loader className="ml-2 h-4 w-4" />
        </Show>
      </Button>
    </form>
  );
}

const UserSalaryDetailsFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex h-[64px] w-full max-w-[400px] flex-col justify-between">
        <Skeleton className="mt-1 h-[17px] w-24" />
        <Skeleton className="h-[40px] w-full" />
      </div>
      <div className="flex h-[64px] w-full max-w-[400px] flex-col justify-between">
        <Skeleton className="mt-1 h-[17px] w-24" />
        <Skeleton className="h-[40px] w-full" />
      </div>
      <div className="flex h-[64px] w-full max-w-[400px] flex-col justify-between">
        <Skeleton className="mt-1 h-[17px] w-24" />
        <Skeleton className="h-[40px] w-full" />
      </div>
      <div className="flex h-[68px] w-full max-w-[400px] flex-col justify-between">
        <div className="flex items-center justify-between">
          <Skeleton className="mt-1 h-[17px] w-24" />
          <Skeleton className="mt-1 h-[15px] w-[15px]" />
        </div>
        <Skeleton className="h-[40px] w-full" />
      </div>
      <ButtonSkeleton className="mt-4" />
    </div>
  );
};

export { UserSalaryDetailsFormSkeleton };
