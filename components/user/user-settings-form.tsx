"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonSkeleton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userSettingsSchema } from "@/lib/validations/user";
import { UserSettings } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "../ui/checkbox";
import { InfoButton } from "../ui/info-button";
import { Show } from "../ui/show";
import { Skeleton } from "../ui/skeleton";

interface UserSettingsFormProps extends HTMLAttributes<HTMLFormElement> {
  userSettings: UserSettings;
}

type FormData = z.infer<typeof userSettingsSchema>;

export function UserSettingsForm({ userSettings, className, ...other }: UserSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      closeUserSalaryDialogOnSaveSuccess: userSettings.closeUserSalaryDialogOnSaveSuccess,
      closeUserWorkDayDetailsDialogOnSaveSuccess:
        userSettings.closeUserWorkDayDetailsDialogOnSaveSuccess
    }
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api-v2/user/settings/${userSettings.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        closeUserSalaryDialogOnSaveSuccess: data.closeUserSalaryDialogOnSaveSuccess,
        closeUserWorkDayDetailsDialogOnSaveSuccess: data.closeUserWorkDayDetailsDialogOnSaveSuccess
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your settings was not updated. Please try again.",
        variant: "destructive"
      });
    }

    toast({
      description: "Your settings has been updated.",
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
      <div className={cn("flex items-center gap-3")}>
        <Checkbox
          id="closeUserSalaryDialogOnSaveSuccess"
          defaultChecked={userSettings?.closeUserSalaryDialogOnSaveSuccess ?? false}
          onCheckedChange={checked =>
            setValue("closeUserSalaryDialogOnSaveSuccess", Boolean(checked))
          }
          {...register("closeUserSalaryDialogOnSaveSuccess", {})}
        />
        <Label htmlFor="closeUserSalaryDialogOnSaveSuccess">Auto close user salary dialog</Label>
        <InfoButton>
          Automatically close the user salary dialog after successfully saving.
        </InfoButton>
        {errors?.closeUserSalaryDialogOnSaveSuccess && (
          <p className="px-1 text-xs text-red-600">
            {errors.closeUserSalaryDialogOnSaveSuccess.message}
          </p>
        )}
      </div>
      <div className={cn("flex items-center gap-3")}>
        <Checkbox
          id="closeUserWorkDayDetailsDialogOnSaveSuccess"
          defaultChecked={userSettings?.closeUserWorkDayDetailsDialogOnSaveSuccess ?? false}
          onCheckedChange={checked =>
            setValue("closeUserWorkDayDetailsDialogOnSaveSuccess", Boolean(checked))
          }
          {...register("closeUserWorkDayDetailsDialogOnSaveSuccess", {})}
        />
        <Label htmlFor="closeUserWorkDayDetailsDialogOnSaveSuccess">
          Auto close work day details dialog
        </Label>
        <InfoButton>
          Automatically close the work day details dialog after successfully saving.
        </InfoButton>
        {errors?.closeUserWorkDayDetailsDialogOnSaveSuccess && (
          <p className="px-1 text-xs text-red-600">
            {errors.closeUserWorkDayDetailsDialogOnSaveSuccess.message}
          </p>
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

const UserSettingsFormSkeleton = () => {
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

export { UserSettingsFormSkeleton };
