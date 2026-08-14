"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import OAuthButton from "./oauth-button";
import Divider from "./divider";
import LoginForm from "./login-form";

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

      {/* Login Form */}
      <LoginForm />

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
