"use client";

import { TransactionContext } from "@/app/context/context";
import { useState, useContext } from "react";

export default function CustomDateInput() {
  const { date, setDate } = useContext(TransactionContext);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Pilih Tanggal";

  return (
    <div className="relative py-4">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
        Tanggal
      </span>

      <div
        className=" relative w-full flex items-center border-b border-zinc-300 pb-1">
        <span className="mr-2 text-sm text-white w-[90%]">{formattedDate}</span>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="
      relative
      flex-1
      cursor-pointer
      text-transparent

      [&::-webkit-datetime-edit]:hidden
      [&::-webkit-calendar-picker-indicator]:m-0
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:invert
    "
        />
      </div>
    </div>
  );
}
