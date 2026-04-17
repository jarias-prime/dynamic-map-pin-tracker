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

  return <LoginForm />;
}
