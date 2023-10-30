"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { InfoButton } from "@/components/ui/info-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { EARNING_CONSTANTS } from "@/constants/earning-constants";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userSalaryDetailSchema } from "@/lib/validations/user";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserSalaryDetailsFormProps extends HTMLAttributes<HTMLFormElement> {
  user: {
    id: User["id"];
    commission: number;
    hourlyRate: number;
    tax: number;
    workHours: number;
    taxTable: User["taxTable"];
  };
  onFormSubmitSuccess?: () => void;
  variant?: "default" | "dialog";
}

type FormData = z.infer<typeof userSalaryDetailSchema>;

function UserSalaryDetailsForm({
  user,
  className,
  onFormSubmitSuccess,
  variant = "default",
  ...other
}: UserSalaryDetailsFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const isLoading = useMemo(() => isPending || isSaving, [isPending, isSaving]);

  const [isTaxTableMode, setIsTaxTableMode] = useState<boolean>(
    user?.taxTable !== undefined && user?.taxTable !== null && user?.taxTable !== ""
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(userSalaryDetailSchema),
    defaultValues: {
      commission: user.commission,
      hourlyRate: user.hourlyRate,
      tax: user.tax,
      workHours: user.workHours,
      taxTable: user.taxTable ?? undefined
    }
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/user/${user.id}/salary`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        commission: data.commission,
        hourlyRate: data.hourlyRate,
        tax: data.tax,
        workHours: data.workHours,
        taxTable: isTaxTableMode ? data.taxTable : null
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
    <form onSubmit={handleSubmit(onSubmit)} {...other}>
      <div className={cn("flex flex-col gap-y-2", className)}>
        <div
          className={cn({
            "flex gap-x-2 sm:flex-col": variant === "dialog"
          })}
        >
          <div className="w-full max-w-[400px]">
            <Label htmlFor="hourlyRate">Hourly rate</Label>
            <Input
              id="hourlyRate"
              type="number"
              className="w-full"
              disabled={isLoading}
              {...register("hourlyRate", {
                valueAsNumber: true
              })}
            />
            {errors?.hourlyRate && (
              <p className="px-1 text-xs text-red-600">{errors.hourlyRate.message}</p>
            )}
          </div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="commission">Commission</Label>
            <Input
              id="commission"
              type="number"
              step="0.01"
              className="w-full"
              disabled={isLoading}
              {...register("commission", {
                valueAsNumber: true
              })}
            />
            {errors?.commission && (
              <p className="px-1 text-xs text-red-600">{errors.commission.message}</p>
            )}
          </div>
        </div>
        <div className="w-full max-w-[400px]">
          <Label htmlFor="tax">{isTaxTableMode ? "Tax table" : "Tax"}</Label>
          <div className="flex items-center gap-x-4">
            <Show when={isTaxTableMode}>
              <Input
                className="hidden"
                id="tax-table"
                hidden
                disabled={isLoading}
                {...register("taxTable")}
              />
              <Select
                onValueChange={value => setValue("taxTable", value)}
                defaultValue={isTaxTableMode && user?.taxTable ? user.taxTable : undefined}
                disabled={isLoading}
              >
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select tax table" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EARNING_CONSTANTS.TAX_TABLES).map(table => (
                    <SelectItem key={table} className="text-base" value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Show>
            <Input
              className={cn({
                hidden: isTaxTableMode
              })}
              id="tax"
              type="number"
              step="0.01"
              disabled={isLoading}
              {...register("tax", {
                valueAsNumber: true
              })}
            />
            <div className="flex grow items-center gap-x-3">
              <Label className="min-w-[82px]" htmlFor="tax-table-mode">
                Use tax table
              </Label>
              <Switch
                id="tax-table-mode"
                defaultChecked={isTaxTableMode}
                disabled={isLoading}
                onCheckedChange={checked => {
                  if (!checked) {
                    setValue("taxTable", undefined);
                  }

                  setIsTaxTableMode(checked);
                }}
              />
            </div>
          </div>
          {errors?.tax && <p className="px-1 text-xs text-red-600">{errors.tax.message}</p>}
          {errors?.taxTable && (
            <p className="px-1 text-xs text-red-600">{errors.taxTable.message}</p>
          )}
        </div>
        <div className="w-full max-w-[400px]">
          <div className="flex items-center justify-between">
            <Label htmlFor="workHours">Work hours</Label>
            <InfoButton size="sm">
              Consultants usually work for {EARNING_CONSTANTS.WORK_HOURS_PER_DAY} hours per day,
              although some may have their lunch break covered by their employers, which can
              increase their work hours to 8 per day.
            </InfoButton>
          </div>
          <Input
            id="workHours"
            type="number"
            step="0.5"
            className="w-full"
            disabled={isLoading}
            {...register("workHours", {
              valueAsNumber: true
            })}
          />
          {errors?.workHours && (
            <p className="px-1 text-xs text-red-600">{errors.workHours.message}</p>
          )}
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
      </div>
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
      <ButtonSkeleton className="mt-4 w-fit" />
    </div>
  );
};

export { UserSalaryDetailsForm, UserSalaryDetailsFormSkeleton };
