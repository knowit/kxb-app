"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createJobOfferSchema } from "@/lib/validations/job-offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateJobOfferFormProps extends HTMLAttributes<HTMLFormElement> {
  commission?: number;
}

type FormData = z.infer<typeof createJobOfferSchema>;

function CreateJobOfferForm({ commission, className, ...other }: CreateJobOfferFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(createJobOfferSchema),
    defaultValues: {
      commission: commission ?? 0.4,
      guaranteeSalary: 40000
    }
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/job-offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commission: data.commission,
        name: data.name,
        email: data.email,
        guaranteeSalary: data.guaranteeSalary
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your job offer was not created. Please try again.",
        variant: "destructive"
      });
    }

    const { insertId } = await response.json();

    toast({
      description: "Job offer created. Navigating you to the job offer page...",
      duration: 5000,
      variant: "success"
    });

    // start transition
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.push(insertId ? `/dashboard/job-offer/${insertId}` : "/dashboard/job-offer");
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
        <Input id="name" className="w-full" size={32} {...register("name")} />
        {errors?.name && <p className="px-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div className="w-full max-w-[400px]">
        <Label htmlFor="email">Email</Label>
        <Input id="email" className="w-full" size={32} {...register("email")} />
        {errors?.email && <p className="mt-1 px-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="w-full max-w-[400px]">
        <Label htmlFor="guaranteeSalary">Guarantee salary</Label>
        <Input
          id="guaranteeSalary"
          type="number"
          step="10000"
          className="w-full"
          {...register("guaranteeSalary", {
            valueAsNumber: true
          })}
        />
        {errors?.guaranteeSalary && (
          <p className="px-1 text-xs text-red-600">{errors.guaranteeSalary.message}</p>
        )}
      </div>
      <div className="w-full max-w-[400px]">
        <Label htmlFor="commission">Commission</Label>
        <Input
          id="commission"
          type="number"
          step="0.01"
          className="w-full"
          {...register("commission", {
            valueAsNumber: true
          })}
        />
        {errors?.commission && (
          <p className="px-1 text-xs text-red-600">{errors.commission.message}</p>
        )}
      </div>
      <Button className="mt-4" type="submit" disabled={isSaving || isPending} variant="action">
        <span>Create</span>
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

const CreateJobOfferFormSkeleton = () => {
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
      <div className="flex h-[64px] w-full max-w-[400px] flex-col justify-between">
        <Skeleton className="mt-1 h-[17px] w-24" />
        <Skeleton className="h-[40px] w-full" />
      </div>
      <ButtonSkeleton className="mt-4" />
    </div>
  );
};

export { CreateJobOfferForm, CreateJobOfferFormSkeleton };
