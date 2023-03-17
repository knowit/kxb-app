import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user/user-avatar";
import { getCurrentUser } from "@/lib/session";
import { getUserAvatar } from "@/lib/user";

export default async function Avatar() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  const userAvatar = await getUserAvatar(user?.activeDirectoryId);

  return <UserAvatar name={user.name} src={userAvatar} />;
}

function AvatarSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full p-0"></Skeleton>;
}

export { AvatarSkeleton };
