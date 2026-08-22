"use client";

import { FormatCurrency } from "@/_utils/format-currency";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TVTotalTransactions } from "../../types/report.type";
import { ConvDateIntl, FormatDate } from "@/_utils/format-date";

type TTotalTransaction = {
  data: TVTotalTransactions[];
};

const TotalTransaction = ({ data }: TTotalTransaction) => {
  const [openDates, setOpenDates] = useState<Date[]>(
    data.map((group) => group.date),
  );

  const toggleDate = (date: Date) => {
    setOpenDates((prev) =>
      prev.includes(date)
        ? prev.filter((item) => item !== date)
        : [...prev, date],
    );
  };

  return (
    <main className="min-h-screen w-full p-6">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Total Transaksi</h1>

          <p className="mt-1 text-sm text-zinc-500">
            Daftar transaksi berdasarkan tanggal
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((group, idx) => {
              const isOpen = openDates.includes(group.date);

              return (
                <section
                  key={idx}
                  className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60"
                >
                  {/* Date */}
                  <button
                    type="button"
                    onClick={() => toggleDate(group.date)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-zinc-900/50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        {ConvDateIntl(group.date)}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-500">
                        {group.transactions.length} transaksi
                      </p>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Transactions */}
                  {isOpen && (
                    <div className="border-t border-zinc-800">
                      {group.transactions.map((transaction, index) => (
                        <div
                          key={transaction.id}
                          className={`flex items-center justify-between gap-4 p-4 ${
                            index !== group.transactions.length - 1
                              ? "border-b border-zinc-800"
                              : ""
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-200">
                              {transaction.information}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {/* {new Intl.DateTimeFormat("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(transaction.createdAt)} */}
                              {FormatDate(transaction.createdAt)}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 text-sm font-semibold ${
                              transaction.transactionModel === "INCOME"
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {transaction.transactionModel === "INCOME"
                              ? "+"
                              : "-"}
                            {/* {FormatCurrency(transaction.amount)} */}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default TotalTransaction;
