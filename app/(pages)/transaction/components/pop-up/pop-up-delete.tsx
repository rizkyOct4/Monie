"use client";

import { useContext, useState, useCallback } from "react";
import { TransactionContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";

export type PopUpDeleteTransactionProps = {
  deleteValue: {
    id: string;
    refId: string;
    nominal: number;
    information: string;
  };
  //   isLoading?: boolean;
  onClose: () => void;
  //   onConfirm: () => void;
};

const PopUpDeleteTransaction = ({
  deleteValue,
  //   isLoading = false,
  onClose,
  //   onConfirm,
}: PopUpDeleteTransactionProps) => {
  const { deleteTransaction, isPendingDeleteTransaction } =
    useContext(TransactionContext);

  // const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const isSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      try {
        // setIsSubmitLoading(true);
        await deleteTransaction(deleteValue);
      } catch (err) {
        console.error(err);
      } finally {
        // setIsSubmitLoading(false);
        onClose();
      }
    },
    [deleteValue, deleteTransaction, onClose],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <form
        className="flex w-full max-w-md flex-col bg-white shadow-xl"
        onSubmit={(e) => isSubmit(e)}
      >
        {/* Header */}
        <div className="border-b border-zinc-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-zinc-900">
            Hapus Transaksi
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <p className="text-sm leading-6 text-zinc-600">
            Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini akan
            menghapus data transaksi beserta data yang berkaitan dan{" "}
            <span className="font-semibold">tidak dapat dibatalkan.</span>
          </p>

          {deleteValue?.information && (
            <div className="flex flex-col border border-zinc-200 bg-zinc-50 p-4">
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                Transaksi
              </span>

              <span className="mt-1 font-medium text-zinc-900">
                {deleteValue.information}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-5">
          <button
            data-testid="close-popup"
            type="button"
            onClick={onClose}
            // disabled={isPendingDeleteTransaction}
            className="cursor-pointer border border-zinc-300 px-5 py-2 text-sm font-medium transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <div className="flex justify-end gap-6 border-t border-zinc-200 pt-6">
            <button
              data-testid="submit-delete-btn"
              type="submit"
              disabled={isPendingDeleteTransaction}
              className=" flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPendingDeleteTransaction ? (
                <div data-testid="is-loading-delete">
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
