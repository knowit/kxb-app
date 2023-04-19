import { Avatar, AvatarFallback, AvatarImage, AvatarSkeleton } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoButton } from "@/components/ui/info-button";
import { Show } from "@/components/ui/show";
import { getMsGraphUserAvatar } from "@/lib/ms-graph";
import { User } from "@/types";
import { getInitials } from "@/utils/common-utils";
import { getFormattedDateAndTime } from "@/utils/date-utils";
import Link from "next/link";
import { Suspense } from "react";

async function UserCardAvatar({ user }: { user: Omit<User, "workDayDetails" | "feedback"> }) {
  const src = await getMsGraphUserAvatar(user.activeDirectoryId);
  return (
    <Avatar size="xl">
      <AvatarImage src={src} alt={`Avatar image of ${user.name}`} />
      <AvatarFallback delayMs={500}>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

async function UserCard({ user }: { user: Omit<User, "workDayDetails" | "feedback"> }) {
  return (
    <Card className="relative mt-12">
      <InfoButton className="absolute right-2 top-2 z-10">
        <p>Created: {getFormattedDateAndTime(new Date(user.created))}</p>
        <p>Last login: {getFormattedDateAndTime(new Date(user.updated))}</p>
      </InfoButton>
      <CardHeader className="absolute w-full -translate-y-1/2 items-center justify-center p-0">
        <Link href={`/admin/users/${user.id}`}>
          <Suspense fallback={<AvatarSkeleton size="xl" />}>
            {/* @ts-expect-error Async Server Component */}
            <UserCardAvatar user={user} className="h-12 w-12 rounded-full p-0" />
          </Suspense>
        </Link>
      </CardHeader>
      <CardContent className="pt-16">
        <CardTitle className="mb-1 min-h-[36px] text-center">{user.name}</CardTitle>
        <CardDescription className="text-center">{user.email}</CardDescription>
        <div className="flex items-center justify-center gap-3 py-3">
          <Show when={user.isAdmin}>
            <Badge variant="green">Admin</Badge>
          </Show>
          <Show when={user.isSpecialist}>
            <Badge variant="secondary">Consultant</Badge>
          </Show>
          <Show when={!user.isSpecialist}>
            <Badge variant="outline-subtle">Unknown</Badge>
          </Show>
        </div>
      </CardContent>
    </Card>
  );
}

export { UserCard, AvatarSkeleton };
