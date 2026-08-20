"use client";

import { useContext, useCallback } from "react";
import { TransactionContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";

export type PopUpDeleteTransactionProps = {
  deleteValue: {
    id: string;
    refId: string;
    nominal: number;
    information: string;
  };
  onClose: () => void;
};

const PopUpDeleteTransaction = ({
  deleteValue,
  onClose,
}: PopUpDeleteTransactionProps) => {
  const { deleteTransaction, isPendingDeleteTransaction } =
    useContext(TransactionContext);

  const isSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        await deleteTransaction(deleteValue);
      } catch (err) {
        console.error(err);
      } finally {
        onClose();
      }
    },
    [deleteValue, deleteTransaction, onClose],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-transaction"
    >
      <form
        aria-label="Delete Transaction Form"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40"
        onSubmit={(e) => isSubmit(e)}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-white">
              Hapus Transaksi
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Konfirmasi penghapusan transaksi
            </p>
          </div>

          <div className="h-10 w-10 rounded-full border border-red-500/20 bg-red-500/10">
            <button
              type="button"
              onClick={onClose}
              // disabled={isPendingDeleteTransaction}
              className="cursor-pointer"
            >
              X
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/6 p-4">
            <p className="text-sm leading-6 text-zinc-300">
              Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini akan
              menghapus data transaksi beserta data yang berkaitan dan{" "}
              <span className="font-semibold text-red-400">
                tidak dapat dibatalkan.
              </span>
            </p>
          </div>

          {deleteValue?.information && (
            <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Transaksi
              </span>

              <span className="mt-2 font-medium text-white">
                {deleteValue.information}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-white/10 bg-black/20 px-6 py-5">
          <div className="flex justify-end gap-6 border-t border-zinc-800 pt-6">
            <button
              type="submit"
              disabled={isPendingDeleteTransaction}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-500 px-6 text-sm font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPendingDeleteTransaction ? (
                <div role="status" aria-label="Is Loading Delete">
                  <Spokes className="size-4 animate-spin" />
                  <span>Dalam Progres...</span>
                </div>
              ) : (
                "Hapus"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PopUpDeleteTransaction;
