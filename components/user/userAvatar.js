import * as React from "react";
import { useUserImage } from "./hooks";

export default function UserAvatar() {
  const userImage = useUserImage();

  return (
    <div className="w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple ">
      <img
        src={userImage}
        alt="lovely avatar"
        className="object-cover object-center w-full h-full visible"
      />
    </div>
  );
}
