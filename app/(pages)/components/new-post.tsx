"use client";

import { Plus } from "lucide-react";
import FormPost from "./form";
import { useState } from "react";

const NewPostBtn = () => {
  const [isPost, setIsPost] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPost(!isPost)}
        className="fixed bottom-10 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition hover:scale-105 z-41"
      >
        <Plus size={24} />
      </button>
      {isPost && <FormPost onBack={() => setIsPost(false)} />}
    </>
  );
};

export default NewPostBtn;
