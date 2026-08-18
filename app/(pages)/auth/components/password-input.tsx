"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: any;
  errorMsg?: any;
  setValue: any;
};

const PasswordInput = ({
  id = "password",
  name = "password",
  label = "Password",
  placeholder = "••••••••",
  value,
  disabled,
  error,
  errorMsg,
  setValue,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs text-gray-400">
        {label}
        {error && <p className="text-red-400 text-[11px]">{errorMsg}</p>}
      </label>

      <div className="relative">
        {/* Lock Icon */}
        <Lock
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        {/* Input */}
        <input
          id={id}
          name={name}
          required
          type={showPassword ? "text" : "password"}
          value={value}
          disabled={disabled}
          onChange={(e) =>
            setValue(name, e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          placeholder={placeholder}
          autoComplete="current-password"
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-zinc-950
            pl-11
            pr-12
            text-white
            outline-none
            transition-all
            placeholder:text-zinc-500
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-800 focus:border-emerald-500"
            }
            disabled:cursor-not-allowed
            disabled:opacity-50
          `}
        />

        {/* Show / Hide */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
