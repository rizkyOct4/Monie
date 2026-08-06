
"use client"

import AuthBanner from "./auth-banner";
import AuthForm from "./auth-form";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-[1920px]">
        {/* Left Side */}
        <div className="hidden w-1/2 border-r border-zinc-800 lg:flex">
          <AuthBanner />
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;