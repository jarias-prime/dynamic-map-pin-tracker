"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

import { useUserStore } from "@/app/store/UserStore";

import { Button } from "@/app/components/ui/Button/Button";

export default function LoginForm() {
  const { login } = useUserStore();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!login(email, password)) {
      setErrorEmail("Please enter a valid email address");
      setErrorPassword("Incorrect passwords, please try again");
    } else {
      setEmail("");
      setPassword("");

      router.push("/client/home");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url(/images/bg-login.jpg)]">
      <div className="grid gap-12 min-h-123.5 min-w-100 bg-background-default rounded-2xl shadow-lg px-10 py-12">
        <Image
          className="m-auto"
          src="/images/map-pinboard-logo.svg"
          alt="Map Pinboard Logo"
          height={20}
          width={116}
        />

        <div className="grid gap-2 text-center">
          <h1 className="font-inter font-semibold text-[20px] text-txt-default leading-7">
            Account Login
          </h1>
          <h2 className="text-[12px] leading-4 text-txt-secondary">
            Please enter your details to sign in.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5">
            {/* Email */}
            <div className="grid gap-1">
              <label className="flex gap-1 font-medium" htmlFor="email">
                <span className="text-sm text-txt-default">Email</span>
                <span className="text-xs text-txt-error">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={clsx(
                  "w-full p-3 border rounded-md transition duration-150 ease-in-out",
                  "placeholder:text-[14px] placeholder:leading-[140%] placeholder:text-txt-secondary",
                  "focus:outline-none focus:ring-2 disabled:opacity-50",
                  errorEmail
                    ? "border-border-error focus:ring-error-500"
                    : "border-border-secondary focus:ring-blue-500",
                )}
                required
              />
              {errorEmail && (
                <p className="text-sm text-txt-error leading-[140%]">
                  {errorEmail}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-1">
              <label
                className="flex gap-1 font-medium text-txt-default"
                htmlFor="password"
              >
                <span className="text-sm text-txt-default">Password</span>
                <span className="text-xs text-txt-error">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={clsx(
                  "w-full p-3 border rounded-md transition duration-150 ease-in-out",
                  "placeholder:text-[14px] placeholder:leading-[140%] placeholder:text-txt-secondary",
                  "focus:outline-none focus:ring-2 disabled:opacity-50",
                  errorPassword
                    ? "border-border-error focus:ring-error-500"
                    : "border-border-secondary focus:ring-blue-500",
                )}
                required
              />
              {errorPassword && (
                <p className="text-sm text-txt-error leading-[140%]">
                  {errorPassword}
                </p>
              )}
            </div>
          </div>

          <Button
            className="w-full"
            variant="primary"
            type="submit"
            disabled={isLoading}
            size="md"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
