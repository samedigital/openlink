"use client";

import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic username validation
    if (!/^[a-z0-9_-]{3,20}$/.test(username)) {
      setError("Username must be 3–20 characters: letters, numbers, - or _");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Sign up with Supabase Auth
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Sign in immediately (Supabase auto-confirms in most setups)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setSuccess("Account created! Please check your email to confirm, then sign in.");
      setLoading(false);
      return;
    }

    // Create DB record with the chosen username
    const res = await fetch("/api/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Setup failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4">
            <LinkIcon className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">OpenLink</h1>
          <p className="text-sm text-neutral-500 mt-1">Create your account</p>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-neutral-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Username
              <span className="text-neutral-400 font-normal ml-1">(your public profile URL)</span>
            </label>
            <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600">
              <span className="px-3 py-2 text-sm text-neutral-400 bg-neutral-50 border-r border-neutral-200">
                yoursite.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
                className="flex-1 px-3 py-2 text-sm outline-none text-neutral-900"
                placeholder="yourname"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-neutral-900"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
