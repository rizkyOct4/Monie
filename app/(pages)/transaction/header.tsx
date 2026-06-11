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
    <section className="flex flex-wrap items-center justify-between gap-6 bg-white p-6 max-sm:flex-col max-sm:items-start">
      {/* // * SUMMARY */}
      <div
        className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-5
        shadow-sm
        w-full"
      >
        <div className="flex flex-col">
          <p className="text-sm text-zinc-500">{isSummary.title}</p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900">
            Rp {isSummary.nominal}
          </h2>
        </div>

        <button
          onClick={handleNextSummary}
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-zinc-200
          text-lg
          font-semibold
          text-zinc-700
          transition
          hover:bg-zinc-100
        "
        >
          →
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* YEAR */}
        <div className="relative">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Tahun
          </span>

          <button
            onClick={() => handleAction("openYear")}
            className="
          flex
          min-w-20
          items-center
          justify-between
          rounded-xl
          border
          border-zinc-200
          px-4
          py-2.5
          text-sm
          font-medium
          text-zinc-800
          transition
          hover:border-zinc-300
          hover:bg-zinc-50
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
            w-full
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-zinc-200
            bg-white
            shadow-lg
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
                px-4
                py-2.5
                text-left
                text-sm
                text-zinc-700
                transition
                hover:bg-zinc-100
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
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Bulan
          </span>

          <button
            onClick={() => handleAction("openMonth")}
            className="
          flex
          min-w-30
          items-center
          justify-between
          rounded-xl
          border
          border-zinc-200
          px-4
          py-2.5
          text-sm
          font-medium
          text-zinc-800
          transition
          hover:border-zinc-300
          hover:bg-zinc-50
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
            w-full
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-zinc-200
            bg-white
            shadow-lg
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
                px-4
                py-2.5
                text-left
                text-sm
                text-zinc-700
                transition
                hover:bg-zinc-100
              "
                >
                  {i}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MONTH */}
        <div className="relative">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Tanggal
          </span>

          <div className="flex gap-4">
            <button
              className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-zinc-200
        text-zinc-700
        transition
        hover:bg-zinc-100
      "
            >
              ←
            </button>

            <h1>30</h1>
            <button
              className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-zinc-200
        text-zinc-700
        transition
        hover:bg-zinc-100
      "
            >
              →
            </button>
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <button
            className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-zinc-200
        text-zinc-700
        transition
        hover:bg-zinc-100
      "
          >
            ←
          </button>

          <button
            className="
        rounded-xl
        bg-zinc-900
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        transition
        hover:bg-zinc-800
      "
          >
            Hari Ini
          </button>

          <button
            className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-zinc-200
        text-zinc-700
        transition
        hover:bg-zinc-100
      "
          >
            →
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TransactionHeader;
