"use client";

import { Suspense } from "react";
import Image from "next/image";

export const SuspenseLoading = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        <div
          className="
            fixed inset-0 z-9999
            flex items-center justify-center
            bg-black/80 backdrop-blur-sm
          "
        >
          <div className="flex items-center gap-3">
            {/* LOGO */}
            <div className="relative h-10 w-10 animate-pulse">
              {/* <Image
                src="/sinarmudaLogo.png"
                alt="Sinarmuda Logo"
                fill
                sizes="40px"
                priority
                className="object-contain"
              /> */}
            </div>

            {/* BRAND */}
            <div className="flex flex-col leading-none">
              <p className="shimmer text-sm text-muted-foreground">
                Monie&hellip;
              </p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
