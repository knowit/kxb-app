import { ProfileForm } from "@/app/dashboard/_components/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { UserDeleteDialog } from "@/components/user/user-delete-dialog";
import { UserProfileFormSkeleton } from "@/components/user/user-profile-form";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserAvatar } from "@/lib/user";
import { getInitials } from "@/utils/common-utils";
import { Suspense } from "react";

export const runtime = "experimental-edge";

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  const token = await getEdgeFriendlyToken();
  const userAvatar = await getUserAvatar(token.id);

  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Label>Avatar</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link
                href={`https://eur.delve.office.com/?u=${token.activeDirectoryId}&v=work`}
                showExternalLinkIcon={false}
              >
                <Avatar>
                  <AvatarImage src={userAvatar.src} alt={`Avatar image of ${userAvatar.name}`} />
                  <AvatarFallback delayMs={500}>{getInitials(userAvatar.name)}</AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent alignOffset={20}>
              Click to edit your avatar at Microsoft Delve.
            </HoverCardContent>
          </HoverCard>
        </div>
        <Suspense fallback={<UserProfileFormSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <ProfileForm />
        </Suspense>
      </div>
      <Separator className="my-8 block sm:hidden" orientation="horizontal" />
      <Separator className="mx-8 hidden sm:block" orientation="vertical" />
      <div>
        <UserDeleteDialog userId={token.id} />
      </div>
    </div>
  );
}
