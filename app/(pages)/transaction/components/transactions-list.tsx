"use client";

import { useState, useCallback, useContext } from "react";
import type { TransactionsDataType } from "../types/types";
import { TransactionContext } from "@/app/context/context";
import FormPutTransactions from "./form-put";

const ListOptionBtn = [
  { value: "Detail Foto" },
  { value: "Perbarui" },
  { value: "Hapus" },
];

type TranscationListProps = {
  TransactionsListData: TransactionsDataType[];
};

const TransactionList = ({ TransactionsListData }: TranscationListProps) => {
  const { idTransaction, setIdTransaction } = useContext(TransactionContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [put, setPut] = useState(false);

  const handleAction = useCallback(
    (actionType: string, id: string) => {
      switch (actionType) {
        case "Perbarui": {
          setIdTransaction(id);
          setPut(true);
          break;
        }
      }
    },
    [setIdTransaction],
  );

  return (
    <section>
      {/* HEADER */}
      <div className="pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Riwayat Transaksi
        </h2>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-4 flex gap-3">
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
      </div>

      {/* LIST */}
      <div className="flex flex-col">
        {TransactionsListData.length > 0 ? (
          TransactionsListData.map((i, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-zinc-100 py-4"
            >
              {/* LEFT */}
              <div>
                <h3 className="font-medium text-black">
                  {i.information || "Transaction"}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(i.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="flex gap-4">
                  {ListOptionBtn.map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAction(b.value, i.id)}
                      className="mt-2 text-xs text-blue-500 hover:underline"
                    >
                      {b.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p
                  className={`font-medium ${
                    i.nominal <= 50000 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {i.nominal <= 50000 ? "-" : "(Hemat Oy !!)"} Rp.
                  {Number(i.nominal).toLocaleString("id-ID")}
                </p>

                <p className="text-xs text-zinc-500">{i.information}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-sm text-zinc-500">Tidak ada transaksi</p>
        )}
      </div>

      {/* // ? */}

      {put && <FormPutTransactions idTransaction={idTransaction} onBack={() => setPut(false)} />}
    </section>
  );
};

export default TransactionList;
