"use client";

import { useState } from "react";

export default function TransactionList({ TransactionsListData }: any) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

//   const filteredTransactions = useMemo(() => {
//     if (!Array.isArray(TransactionsListData)) return [];

//     return TransactionsListData.filter((i) => {
//       const matchSearch =
//         i.information?.toLowerCase().includes(search.toLowerCase()) ||
//         String(i.nominal).includes(search);

//       const matchFilter =
//         filter === "all"
//           ? true
//           : filter === "income"
//           ? i.nominal > 0
//           : i.nominal < 0;

//       return matchSearch && matchFilter;
//     });
//   }, [TransactionsListData, search, filter]);

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
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* LIST */}
      <div className="flex flex-col">
        {TransactionsListData.length > 0 ? (
          TransactionsListData.map((i: any, idx: number) => (
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

                {/* DETAIL BUTTON */}
                <button
                  onClick={() => console.log("detail:", i.id)}
                  className="mt-2 text-xs text-blue-500 hover:underline"
                >
                  Detail
                </button>
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

                <p className="text-xs text-zinc-500">
                  {i.information}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-sm text-zinc-500">
            Tidak ada transaksi
          </p>
        )}
      </div>
    </section>
  );
}