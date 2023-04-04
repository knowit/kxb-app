import { AvatarSkeleton } from "@/components/ui/avatar";
import { ButtonSkeleton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserProfileFormSkeleton } from "@/components/user/user-profile-form";

export default function ProfileLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Label>Avatar</Label>
          <AvatarSkeleton />
        </div>
        <UserProfileFormSkeleton />
      </div>
      <div className="flex">
        <Separator className="my-8 block sm:hidden" orientation="horizontal" />
        <Separator className="mx-8 hidden sm:block" orientation="vertical" />
        <ButtonSkeleton>Delete me</ButtonSkeleton>
      </div>
    </div>
  );
}
