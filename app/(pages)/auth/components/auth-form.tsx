"use client";

import OAuthButton from "./oauth-button";
import Divider from "./divider";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { useState, useMemo } from "react";

const AuthForm = () => {
  const [isOpen, setIsOpen] = useState("index");

  const IsRender = useMemo(() => {
    switch (isOpen) {
      case "register": {
        return <RegisterForm setIsOpen={() => setIsOpen("index")} />;
      }
      default:
        return (
          <>
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
              <button
                type="button"
                onClick={() => setIsOpen("register")}
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                Sign Up
              </button>
            </div>
          </>
        );
    }
  }, [isOpen]);

  return <div className="w-full">{IsRender}</div>;
};

export default AuthForm;
