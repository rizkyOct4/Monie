"use client";

import { Plus } from "lucide-react";
import OptionsFormPost from "./options-form-post";
import { useState, memo } from "react";
import TransactionProvider from "../transaction/context/context";

const NewPostBtn = () => {
  const [isPost, setIsPost] = useState(false);

  return (
    <>
      <button
        aria-label="new-post"
        onClick={() => setIsPost(true)}
        className="fixed bottom-10 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition hover:scale-105 z-41"
      >
        <Plus size={24} />
      </button>
      <TransactionProvider>
        {isPost && <OptionsFormPost onClose={() => setIsPost(false)} />}
      </TransactionProvider>
    </>
  );
};

export default memo(NewPostBtn);
