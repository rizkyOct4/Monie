"use client";

import OptionsIdTransactions from "./options-id-transaction";
import { memo } from "react";

interface IHeaderTransaction {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const FormattedDate = (date: string) => {
  return date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Pilih Tanggal";
};

const HeaderTransaction = ({ date, setDate }: IHeaderTransaction) => {
  const formatDate = FormattedDate(date);

  return (
    <div className="flex items-center justify-between max-sm:flex-col gap-2 sticky top-6  backdrop-blur-sm p-4 rounded-2xl border border-zinc-800">
      <div className="flex items-center justify-center gap-2">
        <label
          htmlFor="Date"
          className="text-sm font-medium text-zinc-200"
          data-testid="formatted-date"
        >
          {formatDate}
        </label>

        <input
          id="Date"
          aria-label="Transaction Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white h-8 w-8 cursor-pointer rounded-lg border border-zinc-800 p-1 text-transparent outline-none transition hover:border-emerald-500/40 hover:bg-zinc-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10
        [&::-webkit-datetime-edit]:hidden [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100
      "
        />
      </div>

      <OptionsIdTransactions />

      <div>
        <h2
          className="text-lg font-semibold tracking-tight text-white"
          aria-label="Title"
        >
          Riwayat Transaksi
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Daftar transaksi yang telah dicatat
        </p>
        {/* <p className="shimmer text-muted-foreground">Generating response&hellip;</p> */}
      </div>
    </div>
  );
};

export default memo(HeaderTransaction);
