"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const HomePage = dynamic(() => import("./HomePage"), { ssr: false });

export default function Home() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return <HomePage />;
}
