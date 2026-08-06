"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import OAuthButton from "./oauth-button";
import Divider from "./divider";

const AuthForm = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign in to continue to your account.
        </p>
      </div>

      {/* OAuth */}
      <div className="mt-8 space-y-3">
        <OAuthButton />

      </div>

      {/* Divider */}
      <Divider className="my-8" text="Or continue with email" />

      {/* Form */}
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-950
                pl-11
                pr-4
                text-white
                outline-none
                transition
                placeholder:text-zinc-500
                focus:border-emerald-500
              "
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Forgot?
            </Link>
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-950
                pl-11
                pr-4
                text-white
                outline-none
                transition
                placeholder:text-zinc-500
                focus:border-emerald-500
              "
            />
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              className="rounded border-zinc-700 bg-zinc-900"
            />
            Remember me
          </label>
        </div>

        {/* Login */}
        <button
          type="submit"
          className="
            h-12
            w-full
            rounded-xl
            bg-emerald-500
            font-semibold
            text-black
            transition
            hover:bg-emerald-400
          "
        >
          Sign In
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-zinc-400">
        <p>Dont have an account? </p>
        <Link
          href="/register"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
