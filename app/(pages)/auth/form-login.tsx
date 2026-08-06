"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { zLoginFormSchema } from "./schema-form";
import { signIn } from "next-auth/react";

type LoginFormSchema = z.infer<typeof zLoginFormSchema>;

const thirdParty = [
  { name: "G", value: "google" },
  { name: "Git", value: "github" },
];

const Login = ({
  setState,
  redirect,
}: {
  setState: (state: boolean) => void;
  redirect: string;
}) => {
  const router = useRouter();

  // * CONTEXT =====
  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    // ? REGEXNYA DISINI TERJADI !!!!
    resolver: zodResolver(zLoginFormSchema),
    mode: "onChange",
  });

  const submit = handleSubmit(async (values) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        console.log(res);
      } else {
        router.refresh();
        router.push(redirect);
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="w-full flex-center px-4">
      <div
        className="w-full max-w-md
      bg-black/60
      border border-white/10
      rounded-xl p-8 text-white"
      >
        <div className="flex justify-between items-start mb-8 w-full">
          <div className="w-[75%]">
            <h3 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h3>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              Enter your email below to login to your account
            </p>
          </div>

          <button
            type="button"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition font-medium"
            onClick={() => setState(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
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

              <input
                id="email"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              placeholder:text-gray-500
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center">
                <label htmlFor="password" className="text-xs text-gray-400">
                  Password
                </label>
                <a
                  href="#"
                  className="ml-auto text-[11px] text-emerald-400 hover:text-emerald-300 transition"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                type="password"
                required
                {...register("password")}
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 mt-8">
            <button
              type="submit"
              className="
            flex-1
            py-2.5
            bg-emerald-500
            hover:bg-emerald-400
            text-black text-sm font-semibold
            rounded-md
            transition
          "
            >
              Login
            </button>

            <div className="flex gap-2">
              {thirdParty.map((i, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={async () =>
                    await signIn(i.value, {
                      redirectTo: redirect,
                    })
                  }
                  className="
                px-3
                py-2.5
                text-sm text-gray-300
                rounded-md
                border border-white/10
                hover:bg-white/10 hover:text-white
                transition
              "
                >
                  {i.name}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
