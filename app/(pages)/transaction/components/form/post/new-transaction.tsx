"use client";

import { Spokes } from "@/components/ui/spokes";
import { useContext, useState } from "react";
import { FormNewPostType, FormNewPostSchema } from "../../../z-schema/z-schema";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "@/app/context/context";

type NewTransactionsProps = {
  onClose: () => void;
};

const NewTransaction = ({ onClose }: NewTransactionsProps) => {
  const { newPostTransaction, isPendingNewPostTransaction } =
    useContext(TransactionContext);

  const [showInfo, setShowInfo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewPostType>({
    resolver: zodResolver(FormNewPostSchema),
    mode: "onChange",
  });

  const submit = handleSubmit(async (values) => {
    try {
      const post = {
        ...values,
        id: nanoid(8),
        initialNominal: Number(values.initialNominal),
        date: new Date(),
      };
      // console.log(post)
      await newPostTransaction(post);
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  });

  // return (
  //   <form onSubmit={submit} aria-label="New Transaction Form">
  //     {/* LABEL + INFO BUTTON */}
  //     <span className="flex items-center justify-between gap-2">
  //       <div className="flex items-center gap-2">
  //         <label htmlFor="name" className="text-xs text-gray-400">
  //           Name *
  //         </label>

  //         <button
  //           type="button"
  //           onClick={() => setShowInfo((prev) => !prev)}
  //           className="
  //             flex h-4 w-4 items-center justify-center
  //             rounded-full border border-gray-500
  //             text-[10px] text-gray-400
  //             transition
  //             hover:border-emerald-500 hover:text-emerald-400"
  //         >
  //           ?
  //         </button>
  //       </div>

  //       {errors.nameTransaction && (
  //         <p
  //           className="text-[11px] text-red-400"
  //           data-testid="error-nameTransaction"
  //         >
  //           {errors.nameTransaction.message}
  //         </p>
  //       )}
  //     </span>

  //     {/* INPUT */}
  //     <input
  //       id="name"
  //       type="text"
  //       placeholder="January 2026"
  //       className=" mt-2 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-emerald-500/40"
  //       required
  //       {...register("nameTransaction")}
  //     />

  //     {/* POPUP INFO + FADE ANIMATION */}
  //     <div
  //       role="dialog"
  //       aria-label="ID Icon Help"
  //       className={`
  //         relative mt-2
  //         transition-all duration-300 ease-out
  //         ${
  //           showInfo
  //             ? "opacity-100 translate-y-0"
  //             : "pointer-events-none opacity-0 -translate-y-2"
  //         }
  //       `}
  //     >
  //       <div
  //         className="
  //           absolute z-10 w-full
  //           rounded-md border border-white/10
  //           bg-zinc-900 p-3 text-xs text-gray-300
  //           shadow-lg
  //         "
  //       >
  //         <p>
  //           <b>Name Transaction</b> adalah ID atau judul unik untuk setiap
  //           transaksi.
  //         </p>
  //       </div>
  //     </div>

  //     <div>
  //       <div className="flex gap-6">
  //         <label
  //           htmlFor="nominal"
  //           className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
  //         >
  //           Inisial Nominal
  //         </label>
  //         {errors.initialNominal && (
  //           <p
  //             className="text-[11px] text-red-400"
  //             data-testid="error-initialNominal"
  //           >
  //             {errors.initialNominal.message}
  //           </p>
  //         )}
  //       </div>

  //       <input
  //         id="nominal"
  //         {...register("initialNominal")}
  //         type="number"
  //         placeholder="Rp. 100"
  //         className="
  //           w-full
  //           border-b
  //           border-zinc-300
  //           pb-2
  //           text-black
  //           outline-none
  //         "
  //       />
  //     </div>

  //     <div className="flex justify-end gap-6 border-t border-zinc-200 pt-6">
  //       <button
  //         type="submit"
  //         disabled={isPendingNewPostTransaction}
  //         className=" flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
  //       >
  //         {isPendingNewPostTransaction ? (
  //           <div role="status" aria-label="Is Loading New Transaction">
  //             <Spokes className="size-4 animate-spin" />
  //             <span>Dalam Progres...</span>
  //           </div>
  //         ) : (
  //           "Submit"
  //         )}
  //       </button>
  //     </div>
  //   </form>
  // );
  return (
    <form onSubmit={submit} aria-label="New Transaction Form">
      {/* LABEL + INFO BUTTON */}
      <div className="mb-1.5 flex items-center gap-2">
        <label
          htmlFor="name"
          className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Name *
        </label>

        <button
          type="button"
          onClick={() => setShowInfo((prev) => !prev)}
          className="
          flex h-5 w-5 items-center justify-center
          rounded-full
          border border-zinc-700
          bg-zinc-900
          text-[10px] font-medium text-zinc-500
          transition
          hover:border-emerald-500/50
          hover:bg-emerald-500/10
          hover:text-emerald-400
        "
        >
          ?
        </button>
      </div>

      {errors.nameTransaction && (
        <p
          className="mt-1 text-[11px] text-red-400"
          data-testid="error-nameTransaction"
        >
          {errors.nameTransaction.message}
        </p>
      )}

      {/* INPUT */}
      <input
        id="name"
        type="text"
        placeholder="January 2026"
        className="
        mt-2
        h-11
        w-full
        rounded-xl
        border border-zinc-800
        bg-zinc-950
        px-3.5
        text-sm
        text-zinc-200
        outline-none
        transition
        placeholder:text-zinc-600
        hover:border-zinc-700
        focus:border-emerald-500/50
        focus:bg-zinc-950
        focus:ring-2
        focus:ring-emerald-500/10
      "
        required
        {...register("nameTransaction")}
      />

      {/* POPUP INFO + FADE ANIMATION */}
      <div
        role="dialog"
        aria-label="ID Icon Help"
        className={`
        relative mt-2
        transition-all duration-300 ease-out
        ${
          showInfo
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        }
      `}
      >
        <div
          className="
          absolute z-10 w-full
          rounded-xl
          border border-zinc-800
          bg-zinc-900
          p-4
          text-xs
          leading-5
          text-zinc-400
          shadow-2xl
          shadow-black/30
        "
        >
          <p>
            <b className="font-semibold text-zinc-200">Name Transaction</b>{" "}
            adalah ID atau judul unik untuk setiap transaksi.
          </p>
        </div>
      </div>

      {/* INITIAL NOMINAL */}
      <div className="mt-6">
        <div className="mb-2 flex items-center gap-4">
          <label
            htmlFor="nominal"
            className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Inisial Nominal
          </label>

          {errors.initialNominal && (
            <p
              className="text-[11px] text-red-400"
              data-testid="error-initialNominal"
            >
              {errors.initialNominal.message}
            </p>
          )}
        </div>

        <input
          id="nominal"
          {...register("initialNominal")}
          type="number"
          placeholder="Rp. 100"
          className="
          h-11
          w-full
          rounded-xl
          border border-zinc-800
          bg-zinc-950
          px-3.5
          text-sm
          text-zinc-200
          outline-none
          transition
          placeholder:text-zinc-600
          hover:border-zinc-700
          focus:border-emerald-500/50
          focus:ring-2
          focus:ring-emerald-500/10
        "
        />
      </div>

      {/* SUBMIT */}
      <div className="mt-6 flex justify-end gap-6 border-t border-zinc-800 pt-5">
        <button
          type="submit"
          disabled={isPendingNewPostTransaction}
          className="
          flex
          h-11
          min-w-28
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-emerald-400/20
          bg-emerald-500
          px-5
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-emerald-950/20
          transition
          hover:bg-emerald-400
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          {isPendingNewPostTransaction ? (
            <div
              role="status"
              aria-label="Is Loading New Transaction"
              className="flex items-center gap-2"
            >
              <Spokes className="size-4 animate-spin" />
              <span>Dalam Progres...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewTransaction;
