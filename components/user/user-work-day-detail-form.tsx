"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoButton } from "@/components/ui/info-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "@/components/ui/link";
import { Show } from "@/components/ui/show";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { CalendarEntries, UserWorkDayDetail } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserWorkDayDetailFormProps extends HTMLAttributes<HTMLFormElement> {
  calendarDay: CalendarEntries;
  userWorkDayDetail?: UserWorkDayDetail;
  isWorkDay?: boolean;
  onFormSubmitSuccess?: () => void;
}

type FormData = z.infer<typeof userWorkDayDetailSchema>;

export function UserWorkDayDetailForm({
  calendarDay,
  userWorkDayDetail,
  isWorkDay = false,
  className,
  onFormSubmitSuccess,
  ...other
}: UserWorkDayDetailFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(userWorkDayDetailSchema),
    defaultValues: {
      id: userWorkDayDetail?.id,
      date: calendarDay.formattedDate,
      nonCommissionedHours: userWorkDayDetail?.nonCommissionedHours ?? 0,
      extraHours: userWorkDayDetail?.extraHours ?? 0,
      sickDay: userWorkDayDetail?.sickDay ?? false
    }
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const nonCommissionedHours = watch("nonCommissionedHours");
  const extraHours = watch("extraHours");

  useEffect(() => {
    if (nonCommissionedHours <= 0) {
      setValue("sickDay", false);
    }
  }, [nonCommissionedHours, setValue]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/user/work-day-detail`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        date: data.date,
        nonCommissionedHours: data.nonCommissionedHours,
        extraHours: data.extraHours,
        sickDay: data.sickDay
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
      <Input
        id="id"
        type="hidden"
        className="w-full"
        {...register("id", {
          setValueAs: value => {
            const number = Number(value);
            return Number.isNaN(number) ? undefined : number;
          }
        })}
      />
      <Input id="date" type="hidden" className="w-full" {...register("date")} />
      <div
        className={cn("", {
          hidden: !(calendarDay.isWorkDay ?? false) || (calendarDay.isHoliday ?? false)
        })}
      >
        <Label htmlFor="nonCommissionedHours">Non commissioned hours</Label>
        <div className="flex gap-3">
          <Input
            id="nonCommissionedHours"
            type="number"
            step="0.5"
            className="w-full"
            disabled={extraHours > 0}
            {...register("nonCommissionedHours", {
              valueAsNumber: true
            })}
          />
          <Button
            className="h-[40px] min-w-[80px] gap-2"
            type="button"
            variant={nonCommissionedHours > 0 ? "destructive" : "outline"}
            onClick={() => setValue("nonCommissionedHours", nonCommissionedHours > 0 ? 0 : 7.5)}
            disabled={extraHours > 0}
          >
            <Show when={nonCommissionedHours <= 0}>
              <Icons.PlusCircled className="h-4 w-4" />
              <span>7.5</span>
            </Show>
            <Show when={nonCommissionedHours > 0}>
              <Icons.MinusCircled className="h-4 w-4" />
              <span>{nonCommissionedHours}</span>
            </Show>
          </Button>
        </div>
        {errors?.nonCommissionedHours && (
          <p className="px-1 text-xs text-red-600">{errors.nonCommissionedHours.message}</p>
        )}
      </div>
      <div
        className={cn("hidden", {
          "flex items-center gap-3": nonCommissionedHours > 0
        })}
      >
        <Checkbox
          id="sick-days"
          defaultChecked={userWorkDayDetail?.sickDay ?? false}
          onCheckedChange={checked => setValue("sickDay", Boolean(checked))}
          {...register("sickDay", {})}
        />
        <Label htmlFor="sick-days">Send as sick hours?</Label>
        <InfoButton>
          <span>
            Sick leave or self-reported sickness grants payment upward limited to 6G. You can read
            more in our{" "}
            <Link
              className="underline underline-offset-4"
              href="https://handbooks.simployer.com/nb-no/article/100139"
            >
              personal handbook
            </Link>
            .
          </span>
        </InfoButton>
        {errors?.sickDay && <p className="px-1 text-xs text-red-600">{errors.sickDay.message}</p>}
      </div>
      <div>
        <Label htmlFor="extraHours">Extra hours</Label>
        <Input
          id="extraHours"
          type="number"
          step="0.5"
          className="w-full"
          disabled={nonCommissionedHours > 0}
          {...register("extraHours", {
            valueAsNumber: true
          })}
        />
        {errors?.extraHours && (
          <p className="px-1 text-xs text-red-600">{errors.extraHours.message}</p>
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
