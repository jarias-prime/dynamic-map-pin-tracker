"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (login(email, password)) {
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid email or password. Use admin@example.com / admin");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
          Dynamic Map Pin Tracker
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-6">
          Demo credentials: admin@example.com / admin
        </p>
      </div>
    </div>
  );
}
