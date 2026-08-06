"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const thirdParty = [
  {
    title: "Continue with Google",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.3C29.4 34.8 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.4l6.3 5.3C40.9 35.3 44 30.1 44 24c0-1.3-.1-2.3-.4-3.5z"
        />
      </svg>
    ),
    value: "google",
  },
  {
    title: "Continue with GitHub",
    icon: <Github size={20} />,
    value: "github",
  },
];

const OAuthButton = () => {
  const redirect = useSearchParams().get("redirect");

  return (
    <>
      {thirdParty.map((i) => (
        <button
          key={i.value}
          type="button"
          onClick={async () =>
            await signIn(i.value, {
              callbackUrl: "/",
            })
          }
          className=" flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm font-medium text-white transition-all hover:border-zinc-700 hover:bg-zinc-900 active:scale-[0.98]"
        >
          {i.icon}

          <span>{i.title}</span>
        </button>
      ))}
    </>
  );
};

export default OAuthButton;
