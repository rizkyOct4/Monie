"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { zLoginFormSchema } from "../schema-form";
import { signIn } from "next-auth/react";
import { Spokes } from "@/components/ui/spokes";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from 'sonner'

type LoginFormSchema = z.infer<typeof zLoginFormSchema>;

const LoginForm = () => {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") ?? "/";

  const [isSubmit, setIsSubmit] = useState(false);
  // const [loginError, setLoginError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    // ? REGEXNYA DISINI TERJADI !!!!
    resolver: zodResolver(zLoginFormSchema),
    mode: "onChange",
  });

  const submit = handleSubmit(async (values) => {
    try {
      setIsSubmit(true);
      // setLoginError(null);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error('Email or password was wrong')
        // setLoginError(
        //   res.code === "INVALID_EMAIL"
        //     ? "Email tidak ditemukan."
        //     : res.code === "INVALID_PASSWORD"
        //       ? "Password salah."
        //       : "Email atau password salah.",
        // );
      } else {
        router.refresh();
        router.push(redirect);
        toast.success('Login Success')
      }
    } catch (err) {
      console.error(err)
      // setLoginError("Email or password was wrong");
    } finally {
      setIsSubmit(false);
    }
  });

  return (
    <form className="space-y-5" onSubmit={submit}>
      {/* Email */}
      <div>
        <span className="flex items-center gap-2">
          <label htmlFor="email" className="text-xs text-gray-400">
            Email
          </label>
          {formState.errors.email && (
            <p className="text-red-400 text-[11px]">
              {formState.errors.email.message}
            </p>
          )}
        </span>
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="you@example.com"
            className=" h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            {formState.errors.password && (
              <p className="text-red-400 text-[11px]">
                {formState.errors.password.message}
              </p>
            )}
          </span>

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
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className=" h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
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
        disabled={isSubmit}
        className=" h-12 w-full rounded-xl bg-emerald-500 font-semibold text-black transition hover:bg-emerald-400"
      >
        {isSubmit ? (
          <>
            <div
              role="status"
              aria-label="Is Loading New Transaction"
              className="flex items-center justify-center gap-2"
            >
              <Spokes className="size-4 animate-spin" />
              <span>Dalam Progres...</span>
            </div>
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
