"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/app/store/UserStore";

const HomePage = dynamic(() => import("@/app/components/HomePage"), {
  ssr: false,
});

export default function Home() {
  const { isAuthenticated, hydrated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push("/");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <HomePage />;
}
