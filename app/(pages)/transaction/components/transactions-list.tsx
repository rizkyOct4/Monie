"use client";

import { useState, useCallback, useMemo } from "react";
import type { TransactionsDataType } from "../types/transaction.type";
import FormPut from "./pop-up/pop-up-form-put";
import PopUpDeleteTransaction from "./pop-up/pop-up-delete";
import PopUpShowImages from "./pop-up/pop-up-show-image";
import { FormatDate } from "@/_utils/format-date";
import { FormatCurrency } from "@/_utils/format-currency";

export const ListOptionBtn = [
  { text: "Detail Foto", value: "detailImage" },
  { text: "Perbarui", value: "putImage" },
  { text: "Hapus", value: "deleteImage" },
];

type TranscationListProps = {
  TransactionsListData: TransactionsDataType[];
};

const TransactionList = ({
  TransactionsListData,
}: TranscationListProps) => {
  // const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("all");

  const [popup, setPopup] = useState("");

  const [imageValue, setImageValue] = useState([]);

  const [putValue, setPutValue] = useState({
    existId: "",
    images: [],
    information: "",
    nominal: 0,
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
        return <FormPut putValue={putValue} onClose={() => setPopup("")} />;
      }
      case "deleteImage": {
        return (
          <PopUpDeleteTransaction
            deleteValue={deleteValue}
            onClose={() => setPopup("")}
          />
        );
      }
    }
  }, [deleteValue, imageValue, popup, putValue]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="transactions-list">
      {/* HEADER */}
      <div className="pb-4" id="transactions-list">
        <h2
          className="text-sm font-semibold uppercase tracking-wide text-zinc-500"
          aria-label="Title"
        >
          Riwayat Transaksi
        </h2>
      </div>

      {/* SEARCH + FILTER */}
      {/* <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-b border-zinc-300 bg-transparent text-sm text-white outline-none"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-b border-zinc-300 bg-black text-sm text-white"
        >
          <option value="all">All</option>
          <option value="newest">Terbaru</option>
          <option value="latest">Terlama</option>
          <option value="mostExpensive">Termahal</option>
          <option value="cheapest">Termurah</option>
        </select>
      </div> */}

      {/* LIST */}
      <div className="flex flex-col">
        {TransactionsListData.length > 0 ? (
          TransactionsListData.map((i, idx) => (
            <div
              role="dialog"
              aria-label="Has Transactions"
              key={idx}
              className={`flex items-center justify-between border-b border-zinc-100 py-4 ${i.status === "FINISH" ? "bg-red-500" : "bg-transparent"}`}
            >
              {/* LEFT */}
              <div>
                <h3
                  className="font-medium text-black"
                  aria-label="Information Transaction"
                >
                  {i.information || "Transaction"}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {FormatDate(i.createdAt)}
                </p>

                <div className="flex gap-4">
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
                        )
                      }
                      className="mt-2 text-xs text-blue-500 hover:underline"
                    >
                      {b.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p
                  data-testid="nominal-transaction"
                  className={`font-medium ${
                    i.nominal <= 50000 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {i.nominal <= 50000 ? "-" : "(Hemat Oy !!)"}{" "}
                  {FormatCurrency(i.nominal)}
                </p>

                <p className="text-xs text-zinc-500">{i.information}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-sm text-zinc-500">Tidak ada transaksi</p>
        )}
      </div>
      {/* // ? POPUP */}
      {PopUpRender}
    </div>
  );
};

export default TransactionList;
