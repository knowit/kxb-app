import { getCurrentUser } from "@/lib/session";
import { getUserEarnings } from "@/lib/user";

export default async function NextPaycheck() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  const userEarnings = await getUserEarnings(user?.activeDirectoryId);

  return (
    <div>
      <div className="text-xs">Next paycheck</div>
      <div className="text-sm">{userEarnings?.nextPayDayStatistics.payDay}</div>
      <div className="text-sm font-bold">{userEarnings?.nextPayDayStatistics.netFormatted}</div>
    </div>
  );
}
