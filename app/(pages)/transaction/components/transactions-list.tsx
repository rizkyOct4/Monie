"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type { TransactionsDataType } from "../types/transaction.type";
import { FormatDate } from "@/_utils/format-date";
import { FormatCurrency } from "@/_utils/format-currency";
import { useInView } from "react-intersection-observer";
import { LoadingIndicator } from "@/components/ui/loading-indicatior";
import {
  LazyFormPutTransaction,
  LazyDeleteTransaction,
  PopUpShowImages,
} from "./lazy-load/index.lazy";
import { useSearchParams } from "next/navigation";

export const ListOptionBtn = [
  { text: "Detail Foto", value: "detailImage" },
  { text: "Perbarui", value: "putImage" },
  { text: "Hapus", value: "deleteImage" },
];

type TranscationListProps = {
  TransactionsListData: TransactionsDataType[];
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const TransactionList = ({
  TransactionsListData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: TranscationListProps) => {
  const searchParams = useSearchParams();
  const transactionName = searchParams.get("v") ?? "";

  // ? 🔹 ref untuk container scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [popup, setPopup] = useState("");
  const [imageValue, setImageValue] = useState([]);
  const [putValue, setPutValue] = useState({
    existId: "",
    images: [],
    information: "",
    nominal: 0,
    prevDate: new Date(),
  });
  const [deleteValue, setDeleteValue] = useState({
    id: "",
    refId: "",
    nominal: 0,
    information: "",
  });

  const handleAction = useCallback(
    (
      actionType: string,
      id: string,
      refId: string,
      images: any,
      information: string,
      nominal: number,
      createdAt: any,
    ) => {
      switch (actionType) {
        case "detailImage": {
          setPopup(actionType);
          setImageValue(images);
          break;
        }
        case "putImage": {
          setPopup(actionType);
          setPutValue({
            existId: id,
            images: images,
            information: information,
            nominal: nominal,
            prevDate: new Date(createdAt),
          });
          break;
        }
        case "deleteImage": {
          setPopup(actionType);
          setDeleteValue({
            id: id,
            refId: refId,
            nominal: nominal,
            information: information,
          });
          break;
        }
      }
    },
    [],
  );

  const PopUpRender = useMemo(() => {
    switch (popup) {
      case "detailImage": {
        return (
          <PopUpShowImages images={imageValue} onClose={() => setPopup("")} />
        );
      }
      case "putImage": {
        return (
          <LazyFormPutTransaction
            putValue={putValue}
            onClose={() => setPopup("")}
          />
        );
      }
      case "deleteImage": {
        return (
          <LazyDeleteTransaction
            deleteValue={deleteValue}
            onClose={() => setPopup("")}
          />
        );
      }
    }
  }, [deleteValue, imageValue, popup, putValue]);

  // ? setup observer
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.2, // ! trigger ketika 20% elemen terlihat
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (!transactionName) return null;

  return (
    <div
      className="flex flex-col gap-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transactions-list"
    >
      {/* LIST */}
      <div className="flex flex-col gap-3 h-auto" ref={containerRef}>
        {Array.isArray(TransactionsListData) && TransactionsListData.length > 0 ? (
          TransactionsListData.map((i, idx) => {
            const isLast = idx === TransactionsListData.length - 1;

            return (
              <div
                role="dialog"
                aria-label="Has Transactions"
                ref={isLast ? lastItemRef : null}
                key={i.id}
                className={`group flex items-center justify-between rounded-2xl border p-5 transition-all ${
                  i.status === "FINISH"
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/70"
                }`}
              >
                {/* LEFT */}
                <div className="flex min-w-0 flex-col">
                  <h3
                    className="truncate text-sm font-semibold text-zinc-100"
                    aria-label="Information Transaction"
                  >
                    {i.information || "Transaction"}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    {FormatDate(i.createdAt)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {ListOptionBtn.map((b, idx) => (
                      <button
                        aria-label={`Button Popup ${b.value}`}
                        key={idx}
                        onClick={() =>
                          handleAction(
                            b.value,
                            i.id,
                            i.refId,
                            i.images,
                            i.information,
                            i.nominal,
                            i.createdAt,
                          )
                        }
                        className="
                      rounded-lg
                      border
                      border-zinc-800
                      bg-zinc-900
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-zinc-400
                      transition-all
                      hover:border-emerald-500/30
                      hover:bg-emerald-500/10
                      hover:text-emerald-400
                    "
                      >
                        {b.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="ml-4 shrink-0 text-right">
                  <p
                    data-testid="nominal-transaction"
                    className={`text-lg font-bold tracking-tight ${
                      i.nominal <= 50000 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {i.nominal <= 50000 ? "-" : "(Hemat Oy !!)"}{" "}
                    {FormatCurrency(i.nominal)}
                  </p>

                  <p className="mt-1 max-w-48 truncate text-xs text-zinc-500">
                    {i.information}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 py-12 text-center">
            <p className="text-sm text-zinc-500">Tidak ada transaksi</p>
          </div>
        )}

        {isFetchingNextPage && (
          <LoadingIndicator text="Loading more transactions..." />
        )}
      </div>

      {/* POPUP */}
      {PopUpRender}
    </div>
  );
};

export default TransactionList;
