import Button from "@/components/button";
import Link from "@/components/link";
import UserAvatar from "@/components/user/userAvatar";
import { useSalary } from "@/utils/salaryProvider";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/client";
import * as React from "react";
import { useClickAway } from "react-use";

const UserNavDetails: React.FC = () => {
  const userMenuRef = React.useRef(null);

  useClickAway(userMenuRef, () => {
    if (showUserMenu) {
      setShowUserMenu(false);
    }
  });

  const [session] = useSession();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { nextPayDayStatistics } = useSalary();

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="flex ml-4 md:ml-6 items-end">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Next paycheck</div>
          <div className="text-xs">{nextPayDayStatistics.payDay}</div>
          <div className="text-sm font-bold text-green-500 dark:text-green-400">
            {nextPayDayStatistics.netFormatted}
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4 md:ml-6">
        <div ref={userMenuRef} className="w-12 h-12 relative">
          <button className="cursor-pointer" onClick={() => setShowUserMenu(prev => !prev)}>
            <UserAvatar />
          </button>
          <motion.div
            className="absolute dark:bg-gray-900 right-0 mt-2 rounded-md shadow-lg overflow-hidden z-20 min-w-[200px]"
            initial={showUserMenu ? "open" : "collapsed"}
            animate={showUserMenu ? "open" : "collapsed"}
            variants={{
              open: {
                opacity: 1,
                height: "auto"
              },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{
              ease: "easeOut"
            }}
          >
            <div className="flex flex-col p-6">
              <Link className="mb-4" href="/profile" onClick={() => setShowUserMenu(false)}>
                Profile
              </Link>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UserNavDetails;
