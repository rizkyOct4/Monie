"use client";

import { useState, useCallback } from "react";

const ListYear = [{ year: 2025 }, { year: 2026 }];

const ListMonth = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const Summary = [
  { title: "Gaji", nominal: "5.000.000", label: "gaji" },
  { title: "Pengeluaran", nominal: "2.000.000", label: "pengeluaran" },
  { title: "Sisa Gaji", nominal: "3.000.000", label: "sisaGaji" },
];

interface State {
  isOpen: boolean;
  year: null | number;
}

const TransactionHeader = () => {
  // * STATE =============
  const [isOpenState, setIsOpenState] = useState<State>({
    isOpen: false,
    year: null,
  });
  const [isOpenMonth, setIsOpenMonth] = useState({
    isOpen: false,
    month: "",
  });
  const [isSummary, setIsSummary] = useState(Summary[0]);

  // * HANDLER =============
  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "openYear": {
        setIsOpenState((prev) => ({
          ...prev,
          isOpen: !prev.isOpen,
        }));
        break;
      }
      case "openMonth": {
        setIsOpenMonth((prev) => ({
          ...prev,
          isOpen: !prev.isOpen,
        }));
        break;
      }
    }
  }, []);

  const handleNextSummary = () => {
    const currentIndex = Summary.findIndex(
      (item) => item.label === isSummary.label,
    );

    const nextIndex = (currentIndex + 1) % Summary.length;

    setIsSummary(Summary[nextIndex]);
  };

  return (
    <section
      className="
    flex
    flex-wrap
    items-end
    justify-between
    gap-8
    border-b
    border-zinc-200
    pb-6
    max-sm:flex-col
    max-sm:items-start
  "
    >
      {/* SUMMARY */}
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            {isSummary.title}
          </p>

          <h2 className="mt-1 text-4xl font-bold text-white">
            Rp {isSummary.nominal}
          </h2>
        </div>

        <button
          onClick={handleNextSummary}
          className="
        flex
        h-9
        w-9
        items-center
        justify-center
        border
        border-zinc-200
        text-zinc-600
        transition
        hover:bg-zinc-50
      "
        >
          →
        </button>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap items-end gap-6">
        {/* YEAR */}
        <div className="relative">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Tahun
          </span>

          <button
            onClick={() => handleAction("openYear")}
            className="
          min-w-24
          border-b
          border-zinc-300
          pb-1
          text-left
          text-sm
          text-white
        "
          >
            {isOpenState.year || "Pilih Tahun"}
          </button>

          {isOpenState.isOpen && (
            <div
              className="
            absolute
            top-full
            left-0
            z-20
            mt-2
            flex
            min-w-24
            flex-col
            border
            border-zinc-200
            bg-white
          "
            >
              {ListYear.map((i) => (
                <button
                  key={i.year}
                  onClick={() =>
                    setIsOpenState({
                      isOpen: false,
                      year: i.year,
                    })
                  }
                  className="
                px-3
                py-2
                text-left
                text-sm
                hover:bg-zinc-50
              "
                >
                  {i.year}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MONTH */}
        <div className="relative">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Bulan
          </span>

          <button
            onClick={() => handleAction("openMonth")}
            className="
          min-w-28
          border-b
          border-zinc-300
          pb-1
          text-left
          text-sm
          text-white
        "
          >
            {isOpenMonth.month || "Pilih Bulan"}
          </button>

          {isOpenMonth.isOpen && (
            <div
              className="
            absolute
            top-full
            left-0
            z-20
            mt-2
            flex
            min-w-32
            flex-col
            border
            border-zinc-200
            bg-white
          "
            >
              {ListMonth.map((i) => (
                <button
                  key={i}
                  onClick={() =>
                    setIsOpenMonth({
                      isOpen: false,
                      month: i,
                    })
                  }
                  className="
                px-3
                py-2
                text-left
                text-sm
                hover:bg-zinc-50
              "
                >
                  {i}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DATE */}
        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Tanggal
          </span>

          <div className="flex items-center gap-4">
            <button
              className="
            flex
            h-8
            w-8
            items-center
            justify-center
            border
            border-zinc-200
            text-zinc-600
            hover:bg-zinc-50
          "
            >
              ←
            </button>

            <span className="min-w-8 text-center font-medium text-white">
              30
            </span>

            <button
              className="
            flex
            h-8
            w-8
            items-center
            justify-center
            border
            border-zinc-200
            text-zinc-600
            hover:bg-zinc-50
          "
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionHeader;
