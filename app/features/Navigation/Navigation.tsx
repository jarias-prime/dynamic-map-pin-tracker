"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import clsx from "clsx";

import { useUserStore } from "@/app/store/UserStore";

export const Navigation = () => {
  const router = useRouter();

  const { logout } = useUserStore();

  return (
    <div className="h-13 w-full bg-background-default shadow px-4 py-4 flex items-center justify-between">
      <div className="w-8"></div>

      <h5 className="flex items-center gap-3 font-bold">
        <Image
          className="m-auto"
          src="/images/map-pinboard-logo.svg"
          alt="Map Pinboard Logo"
          height={28}
          width={116}
        />
      </h5>

      {/* For Testing purposes */}
      <button
        className={clsx(
          "p-2 rounded-lg cursor-pointer",
          "transition duration-150 ease-in-out opacity-0",
          "hover:bg-background-default-disabled",
          "active:scale-90",
        )}
        onClick={() => {
          logout();

          router.push("/");
        }}
      >
        <Image
          src="/images/sign-out.svg"
          alt="Logout Icon"
          height={24}
          width={24}
        />
      </button>
    </div>
  );
};
