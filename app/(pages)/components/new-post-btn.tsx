"use client";

import { Plus } from "lucide-react";
import OptionsFormPost from "../transaction/components/form/post/options-form-post";
import { useState, memo } from "react";
import { useSessionClient } from "@/_lib/c-session";
import TransactionProvider from "../transaction/context/context";

const NewPostBtn = () => {
  const [isPost, setIsPost] = useState(false);
  const session = useSessionClient();
  const publicId = session?.publicId;

  return (
    <>
      {publicId && (
        <>
          <button
            aria-label="new-post"
            onClick={() => setIsPost(true)}
            className=" fixed bottom-20 right-5 z-101 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition duration-200 hover:scale-105 hover:bg-emerald-400 active:scale-95"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>

          <TransactionProvider>
            {isPost && <OptionsFormPost onClose={() => setIsPost(false)} />}
          </TransactionProvider>
        </>
      )}
    </>
  );
};

export default memo(NewPostBtn);
