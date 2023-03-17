"use client";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { userSalaryDetailSchema } from "@/lib/validations/user";
import { useState, useTransition, type HTMLAttributes } from "react";
import { Show } from "../ui/show";

interface UserSalaryDetailsFormProps extends HTMLAttributes<HTMLFormElement> {
  user: {
    id: User["id"];
    commission: number;
    hourlyRate: number;
    tax: number;
    workHours: number;
  };
}

type FormData = z.infer<typeof userSalaryDetailSchema>;

export function UserSalaryDetailsForm({ user, className, ...props }: UserSalaryDetailsFormProps) {
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

    const response = await fetch(`/api/user/${user.id}`, {
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
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <form
      className={cn("flex flex-col gap-y-2", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="">
        <Label htmlFor="name">Hourly rate</Label>
        <Input
          id="name"
          type="number"
          className="w-full max-w-[400px]"
          size={32}
          {...register("hourlyRate", {
            valueAsNumber: true
          })}
        />
        {errors?.hourlyRate && (
          <p className="px-1 text-xs text-red-600">{errors.hourlyRate.message}</p>
        )}
      </div>
      <div className="">
        <Label htmlFor="name">Commission</Label>
        <Input
          id="name"
          type="number"
          step="0.01"
          className="w-full max-w-[400px]"
          size={32}
          {...register("commission", {
            valueAsNumber: true
          })}
        />
        {errors?.commission && (
          <p className="px-1 text-xs text-red-600">{errors.commission.message}</p>
        )}
      </div>
      <div className="">
        <Label htmlFor="name">Tax</Label>
        <Input
          id="name"
          type="number"
          step="0.01"
          className="w-full max-w-[400px]"
          size={32}
          {...register("tax", {
            valueAsNumber: true
          })}
        />
        {errors?.tax && <p className="px-1 text-xs text-red-600">{errors.tax.message}</p>}
      </div>
      <div className="">
        <Label htmlFor="name">Work hours</Label>
        <Input
          id="name"
          type="number"
          step="0.5"
          className="w-full max-w-[400px]"
          size={32}
          {...register("workHours", {
            valueAsNumber: true
          })}
        />
        {errors?.workHours && (
          <p className="px-1 text-xs text-red-600">{errors.workHours.message}</p>
        )}
      </div>
      <Button className="mt-4" type="submit" disabled={isSaving || isPending}>
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
