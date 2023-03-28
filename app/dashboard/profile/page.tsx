import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import Link from "@/components/ui/link";
import { UserDeleteDialog } from "@/components/user/user-delete-dialog";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserAvatar } from "@/lib/user";
import { getInitials } from "@/utils/common-utils";

export const runtime = "experimental-edge";

export const metadata = {
  title: "Profile"
};

export default async function ProfilePage() {
  const token = await getEdgeFriendlyToken();
  const userAvatar = await getUserAvatar(token.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="flex items-center gap-3">
          <Label>Avatar</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link
                className="ml-22 inline-flex"
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
      </div>
      <div>
        <UserDeleteDialog userId={token.id} />
      </div>
    </div>
  );
}
