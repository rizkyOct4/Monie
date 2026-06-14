"use client";

import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Register = () => {
  const redirect = useSearchParams().get("redirect") ?? "/";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 z-200">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Selamat Datang</h1>

          <p className="text-muted-foreground">
            Masuk untuk mengakses seluruh fitur aplikasi.
          </p>
        </div>

        <div className="mt-8">
          <button
            className="w-full bg-white"
            // size="lg"
            onClick={async () =>
              await signIn("google", {
                redirectTo: redirect,
              })
            }
          >
            <Chrome className="mr-2 h-4 w-4" />
            Lanjutkan dengan Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dengan melanjutkan, Anda menyetujui syarat dan ketentuan serta
          kebijakan privasi kami.
        </p>
      </div>
    </main>
  );
};

export default Register;
