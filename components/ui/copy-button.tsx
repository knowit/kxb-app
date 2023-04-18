"use client";
import { Icons } from "@/components/icons";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { Button } from "./button";

type CopyButtonProps = ComponentPropsWithoutRef<typeof Button> &
  VariantProps<typeof Button> & {
    iconSize?: "default" | "sm" | "lg" | "xl";
    value: string;
    src?: string;
  };

async function copyToClipboardWithMeta(value: string, meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  src,
  iconSize = "default",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      onClick={() => {
        copyToClipboardWithMeta(value, {
          component: src
        });
        setHasCopied(true);
        toast({
          title: "Copied to clipboard",
          description: value,
          duration: 2000,
          variant: "success"
        });
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Icons.Check
          className={cn({
            "h-4 w-4": iconSize === "default",
            "h-3 w-3": iconSize === "sm",
            "h-6 w-6": iconSize === "lg",
            "h-7 w-7": iconSize === "xl"
          })}
        />
      ) : (
        <Icons.Copy
          className={cn({
            "h-4 w-4": iconSize === "default",
            "h-3 w-3": iconSize === "sm",
            "h-6 w-6": iconSize === "lg",
            "h-7 w-7": iconSize === "xl"
          })}
        />
      )}
    </Button>
  );
}
