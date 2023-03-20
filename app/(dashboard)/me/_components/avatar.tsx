import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user/user-avatar";
import { getUserAvatar } from "@/lib/user";

export default async function Avatar() {
  const userAvatar = await getUserAvatar();

  if (!userAvatar) {
    return <AvatarSkeleton />;
  }

  return <UserAvatar name={userAvatar.name} src={userAvatar?.src} />;
}

function AvatarSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full p-0"></Skeleton>;
}

export { AvatarSkeleton };
