"use client";

import { Spokes } from "@/components/ui/spokes";
import { useContext } from "react";
import {
  FormNewPostType,
  FormNewPostSchema,
} from "../transaction/z-schema/z-schema";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "@/app/context/context";

type NewTransactionsProps = {
  showInfo: boolean;
  onInfo: () => void;
  onClose: () => void;
};

const NewTransaction = ({
  showInfo,
  onInfo,
  onClose,
}: NewTransactionsProps) => {
  const { newPostTransaction, isPendingNewPostTransaction } =
    useContext(TransactionContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  return (
    <form onSubmit={submit} aria-label="New Transaction Form">
      {/* LABEL + INFO BUTTON */}
      <span className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="text-xs text-gray-400">
            Name *
          </label>

          <button
            type="button"
            onClick={() => onInfo()}
            className="
              flex h-4 w-4 items-center justify-center
              rounded-full border border-gray-500
              text-[10px] text-gray-400
              transition
              hover:border-emerald-500 hover:text-emerald-400"
          >
            ?
          </button>
        </div>

        {errors.nameTransaction && (
          <p className="text-[11px] text-red-400">
            {errors.nameTransaction.message}
          </p>
        )}
      </span>

      {/* INPUT */}
      <input
        id="name"
        type="text"
        placeholder="January 2026"
        className="
          mt-2
          w-full
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
        {...register("nameTransaction")}
      />

      {/* POPUP INFO + FADE ANIMATION */}
      <div
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
            rounded-md border border-white/10
            bg-zinc-900 p-3 text-xs text-gray-300
            shadow-lg
          "
        >
          <p>
            <b>Name Transaction</b> adalah ID atau judul unik untuk setiap
            transaksi.
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Inisial Nominal
        </label>

        <input
          {...register("initialNominal")}
          type="number"
          placeholder="Rp. 100"
          className="
            w-full
            border-b
            border-zinc-300
            pb-2
            text-black
            outline-none
          "
        />
      </div>

      <div className="flex justify-end gap-6 border-t border-zinc-200 pt-6">
        <button
          type="submit"
          disabled={isPendingNewPostTransaction}
          className=" flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPendingNewPostTransaction ? (
            <>
              <Spokes className="size-4 animate-spin" />
              <span>Dalam Progres...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewTransaction;
