"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function UserForceAvatarRefresh() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Button
      variant="ghost"
      onClick={async () => {
        toast({
          title: "Avatar refresh queued",
          description: "Your avatar will update shortly."
        });

        const response = await fetch("/api/user/force-avatar-refresh", {
          method: "POST"
        });

        if (response.ok) {
          toast({
            title: "Avatar refresh complete",
            description: "Your avatar should update shortly.",
            variant: "success"
          });
        } else {
          toast({
            title: "Avatar refresh failed",
            description: "Please try again later.",
            variant: "destructive"
          });
        }

        router.refresh();
      }}
    >
      <Icons.Update />
    </Button>
  );
}

export { UserForceAvatarRefresh };
