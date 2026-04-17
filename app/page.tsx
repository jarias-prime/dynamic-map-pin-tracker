"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/app/store/UserStore";

import LoginForm from "./client/login/LoginForm";

export default function Page() {
  const { isAuthenticated } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/client/home");
    }
  }, [isAuthenticated, router]);

  return <LoginForm />;
}
