"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
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

interface UserSettingsFormProps extends HTMLAttributes<HTMLFormElement> {
  userSettings: UserSettings;
}

type FormData = z.infer<typeof userSettingsSchema>;

export function UserSettingsForm({ userSettings, className, ...props }: UserSettingsFormProps) {
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
        description: "Your settins was not updated. Please try again.",
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
      {...props}
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
        <Label htmlFor="closeUserSalaryDialogOnSaveSuccess">
          Close user salary dialog on save success?
        </Label>
        <InfoButton>
          <></>
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
          Close user work day details dialog on save success?
        </Label>
        <InfoButton>
          <></>
        </InfoButton>
        {errors?.closeUserWorkDayDetailsDialogOnSaveSuccess && (
          <p className="px-1 text-xs text-red-600">
            {errors.closeUserWorkDayDetailsDialogOnSaveSuccess.message}
          </p>
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
