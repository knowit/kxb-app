import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user/user-avatar";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserAvatar } from "@/lib/user";

export default async function Avatar() {
  const token = await getEdgeFriendlyToken();
  const userAvatar = await getUserAvatar(token.id);

  return <UserAvatar name={userAvatar?.name} src={userAvatar?.src} isAdmin={token.isAdmin} />;
}

function AvatarSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full p-0"></Skeleton>;
}

export { AvatarSkeleton };
