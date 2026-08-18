"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spokes } from "@/components/ui/spokes";
import { useState } from "react";
import { zRegisterFormSchema } from "../schema-form";
import { Lock, Mail, User } from "lucide-react";
import { ROUTES_AUTH } from "../config-route/config-auth";
import axios from "axios";
import PasswordInput from "./password-input";

type RegisterFormSchema = z.infer<typeof zRegisterFormSchema>;

interface IRegisterForm {
  setIsOpen: () => void;
}

const RegisterForm = ({ setIsOpen }: IRegisterForm) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    getValues,
    control,
  } = useForm<RegisterFormSchema>({
    // ? REGEXNYA DISINI TERJADI !!!!
    resolver: zodResolver(zRegisterFormSchema),
    mode: "onChange",
  });

  const checkPs = getValues("password");
  const checkConfirmPs =
    useWatch({
      control,
      name: "confirmPassword",
    }) ?? [];

  const [isSubmit, setIsSubmit] = useState(false);
  const [psDidntMatch, setPsDidntMatch] = useState({
    status: false,
    amount: 0,
  });

  const submit = handleSubmit(async (values) => {
    try {
      if (checkConfirmPs !== checkPs) {
        setPsDidntMatch((prev) => ({
          status: true,
          amount: prev.amount + 1,
        }));
        return;
      }

      setIsSubmit(true);

      const URL = ROUTES_AUTH("register");
      await axios.post(URL, {
        ...values,
        userType: "REGULAR",
        createdAt: new Date(),
      });
      reset();
      setIsSubmit(false);
      setIsOpen();
      console.log(values);
    } catch (error) {
      setIsSubmit(false);

      console.error(error);
    }
  });

  return (
    <form className="space-y-5" onSubmit={submit}>
      <button
        type="button"
        className="flex-1 text-xs text-emerald-400 hover:text-emerald-300"
        onClick={() => setIsOpen()}
      >
        Back
      </button>
      {/* Name */}
      <div>
        <span className="flex items-center gap-2">
          <label htmlFor="name" className="text-xs text-gray-400">
            Name
          </label>

          {formState.errors.name && (
            <p className="text-red-400 text-[11px]">
              {formState.errors.name.message}
            </p>
          )}
        </span>

        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            {...register("name")}
            id="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
          />
        </div>
      </div>

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
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Password */}
      <PasswordInput
        id="password"
        label="Password"
        setValue={setValue}
        error={!!formState.errors.password}
        errorMsg={formState.errors.password?.message}
      />

      {/* Confirm Password */}
      <div>
        <span className="flex items-center gap-2">
          <label htmlFor="confirmPassword" className="text-xs text-gray-400">
            Confirm Password
          </label>
          {psDidntMatch.status && (
            <p className="text-red-400 text-[11px]">
              Password didnt match {psDidntMatch.amount}
            </p>
          )}
        </span>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Register */}
      <button
        type="submit"
        disabled={isSubmit}
        className="h-12 w-full rounded-xl bg-emerald-500 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmit ? (
          <div
            role="status"
            aria-label="Registering account"
            className="flex items-center justify-center gap-2"
          >
            <Spokes className="size-4 animate-spin" />
            <span>Dalam Progres...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
