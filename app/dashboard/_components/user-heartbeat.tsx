import { updateUser } from "@/lib/actions/user-actions";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getFormattedDateAndTime, getMySQLDate } from "@/utils/date-utils";

async function UserHeartbeat() {
  const now = new Date();
  const token = await getEdgeFriendlyToken();

  await updateUser(token.id, {
    updated: getMySQLDate(now)
  });

  return (
    <div className="invisible flex justify-center">
      <p>
        Last updated:{" "}
        <time className="mx-auto" dateTime={now.toISOString()}>
          {getFormattedDateAndTime(now)}
        </time>
      </p>
    </div>
  );
}

function UserHeartbeatSkeleton() {
  return <div className="invisible flex h-[24px] justify-center" />;
}

export { UserHeartbeat, UserHeartbeatSkeleton };
