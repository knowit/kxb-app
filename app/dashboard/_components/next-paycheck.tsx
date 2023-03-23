import { Skeleton } from "@/components/ui/skeleton";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserEarnings } from "@/lib/user";

export default async function NextPaycheck() {
  const token = await getEdgeFriendlyToken();
  const userEarnings = await getUserEarnings(token.id);

  return (
    <div className="min-w-[120px]">
      <div className="text-xs text-neutral-400">Next paycheck</div>
      <div className="text-sm">{userEarnings?.nextPayDayStatistics.payDay}</div>
      <div className="text-sm font-bold text-emerald-500">
        {userEarnings?.nextPayDayStatistics.netFormatted}
      </div>
    </div>
  );
}

const NextPaycheckSkeleton = () => {
  return (
    <div className="min-w-[120px]">
      <div className="text-xs text-neutral-400">Next paycheck</div>
      <div className="text-sm">
        <Skeleton className="mb-[2px] h-[19px] w-full"></Skeleton>
      </div>
      <div className="text-sm font-bold">
        <Skeleton className="h-[19px] w-24"></Skeleton>
      </div>
    </div>
  );
};

export { NextPaycheckSkeleton };
