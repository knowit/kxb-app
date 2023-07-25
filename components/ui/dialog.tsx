"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { Drawer } from "vaul";

const Dialog = ({ ...props }: DialogPrimitive.DialogProps) => {
  const { isMobile } = useWindowSize();
  const Component = isMobile ? Drawer.Root : DialogPrimitive.Root;

  return <Component shouldScaleBackground {...props} />;
};

Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, children, ...other }, ref) => {
  const { isMobile } = useWindowSize();
  const Component = isMobile ? Drawer.Trigger : DialogPrimitive.Trigger;

  return (
    <Component ref={ref} className={cn(className)} {...other}>
      {children}
    </Component>
  );
});

DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

const DialogPortal = ({ className, children, ...other }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...other}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...other }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...other}
    ref={ref}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...other }, ref) => {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content className="fixed inset-x-0 bottom-0 mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] border border-neutral-700 bg-white px-6 pb-6 dark:bg-neutral-900">
            <div className="mx-auto my-3 h-1 w-12 rounded-full bg-gray-300" />
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </>
    );
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-0 z-50 grid w-full gap-4 rounded-b-lg border border-neutral-700 bg-white p-6 animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-top-full sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-top-0 lg:top-auto",
          "dark:bg-neutral-900",
          className
        )}
        {...other}
      >
        {children}
        <DialogPrimitive.Close
          asChild
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-900 dark:data-[state=open]:bg-neutral-800"
        >
          <Button className="absolute right-4 top-4" variant="ghost">
            <Icons.Close className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...other }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...other} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...other }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...other}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...other }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-neutral-900", "dark:text-neutral-50", className)}
    {...other}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...other }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-neutral-500", "dark:text-neutral-400", className)}
    {...other}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
};
