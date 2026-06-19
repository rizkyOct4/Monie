"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zRegisterFormSchema } from "./schema-form";
import { CONFIG_AUTH } from "./config-auth";

type RegisterFormSchema = z.infer<typeof zRegisterFormSchema>;

const Register = ({ setState }: { setState: (state: boolean) => void }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<RegisterFormSchema>({
      resolver: zodResolver(zRegisterFormSchema),
      mode: "onChange",
    });

  const submit = handleSubmit(async (values) => {
    try {
      const URL = CONFIG_AUTH("register");
      const { data } = await axios.post(URL, values);
      console.log(data.message);
      setState(true);
      // console.log(values);
      // reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="w-full flex-center px-4 max-sm:h-180 max-sm:overflow-y-scroll">
      <div
        className="w-full max-w-xl rounded-xl bg-black/60
      border border-white/10 p-8 text-white">
        <div className="flex justify-between items-start mb-8 w-full max-sm:mb-2 max-sm:w-full max-sm:flex-col ">
          <h3 className="text-2xl font-semibold tracking-tight lg:w-[75%]">
            Create an account
          </h3>

          <button
            type="button"
            className="flex-1 text-xs text-emerald-400 hover:text-emerald-300"
            onClick={() => setState(true)}>
            Already have account
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 max-sm:flex-col">
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="flex items-center justify-between gap-2">
                  <label htmlFor="name" className="text-xs text-gray-400">
                    Name
                  </label>
                  {formState.errors.name && (
                    <p className="text-red-400 text-[11px]">
                      {formState.errors.name.message}
                    </p>
                  )}
                </span>

                <input
                  id="name"
                  type="text"
                  placeholder="John"
                  className="
                rounded-md
                border border-white/10
                bg-black/40
                px-3 py-2
                text-sm text-gray-200
                placeholder:text-gray-500
                outline-none
                focus:border-emerald-500/40
              "
                  required
                  {...register("name")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="flex items-center justify-between gap-2">
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
                type="email"
                placeholder="m@example.com"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              placeholder:text-gray-500
              outline-none
              focus:border-emerald-500/40
            "
                required
                {...register("email")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="flex items-center justify-between gap-2">
                <label htmlFor="password" className="text-xs text-gray-400">
                  Password
                </label>
                {formState.errors.password && (
                  <p className="text-red-400 text-[11px]">
                    {formState.errors.password.message}
                  </p>
                )}
              </span>

              <input
                id="password"
                type="password"
                placeholder="Your secure password"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              placeholder:text-gray-500
              outline-none
              focus:border-emerald-500/40
            "
                required
                {...register("password")}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <div className="flex-1 flex flex-col gap-1.5">
                <label htmlFor="userType" className="text-xs text-gray-400">
                  User Type
                </label>
                <select
                  id="userType"
                  className="
                rounded-md
                border border-white/10
                bg-black/40
                px-3 py-2
                text-sm text-gray-200
                outline-none
                focus:border-emerald-500/40
              "
                  defaultValue="REGULAR"
                  {...register("userType")}>
                  <option value="REGULAR" className="bg-black text-white">
                    Regular
                  </option>
                  <option value="PREMIUM" className="bg-black text-white">
                    Premium
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3 mt-8">
            <button
              type="submit"
              className="w-full py-2.5 rounded-md
            bg-emerald-500
            hover:bg-emerald-400
            text-black text-sm font-semibold">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
