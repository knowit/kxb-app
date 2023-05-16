import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user/user-avatar";
import { updateUser } from "@/lib/actions/user-actions";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserAvatar } from "@/lib/user";
import { getMySQLDate } from "@/utils/date-utils";

async function Avatar() {
  const token = await getEdgeFriendlyToken();
  const userAvatar = await getUserAvatar(token.id);

  // TODO: Move to own RSC?
  void updateUser(token.id, {
    updated: getMySQLDate()
  });

  return <UserAvatar name={userAvatar?.name} src={userAvatar?.src} isAdmin={token.isAdmin} />;
}

function AvatarSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full p-0"></Skeleton>;
}

export { Avatar, AvatarSkeleton };
