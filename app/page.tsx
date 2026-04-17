"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/AuthContext";

import LoginForm from "./client/login/LoginForm";

export default function Page() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/client/home");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <LoginForm />
    </div>
  );
}
