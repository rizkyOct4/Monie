"use client";

import { Search, Loader2 } from "lucide-react";
import { useState, useContext } from "react";
import { TransactionContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";

type SearchIdTransactionProps = {
  setIdExisted: React.Dispatch<React.SetStateAction<string>>;
  setValue: any;
};

const SearchIdTransaction = ({
  setIdExisted,
  setValue,
}: SearchIdTransactionProps) => {
  const {
    IdTransactionsListData,
    search,
    setSearch,
    SearchIdTransactionData,
    isFetchingSearchIdTransaction,
    isFetchingIdTransactionsList,
  } = useContext(TransactionContext);

  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Pilih Id");

  return (
    <>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <div className="relative w-full">
            <label
              htmlFor="transactionName"
              className="mb-1 block text-xs text-gray-400"
            >
              ID TRANSAKSI *
            </label>

            <button
              aria-label="Open list ID transaction"
              type="button"
              onClick={() => setOpen(!open)}
              className=" flex w-full items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 focus:border-emerald-500/40"
            >
              <span data-testid="selected-id">{selected}</span>

              <svg
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div
                className=" absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-lg animate-in fade-in slide-in-from-top-1"
                role="dialog"
                aria-label="Container List ID Transaction"
              >
                {isFetchingIdTransactionsList && (
                  <div
                    role="status"
                    aria-label="Loading ID Transaction"
                    className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-500"
                  >
                    <Spokes className="size-4 animate-spin text-emerald-400" />
                    <span>Dalam Progres...</span>
                  </div>
                )}

                {Array.isArray(IdTransactionsListData) &&
                IdTransactionsListData.length > 0 ? (
                  IdTransactionsListData.map((i) => (
                    <button
                      aria-label={`List ID transaction ${i.id}`}
                      key={i.id}
                      type="button"
                      onClick={() => {
                        setSelected(i.initialName);
                        setValue("nameTransaction", i.initialName);
                        setIdExisted(i.id);
                        setOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/5"
                    >
                      {i.initialName}
                    </button>
                  ))
                ) : (
                  <p role="status" aria-label="Has No Data">
                    No ID
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* // ? SEARCH BUTTON */}
        <button
          aria-label="Search Button"
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          className=" rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition cursor-pointer"
        >
          <Search />
        </button>
      </div>

      {showSearch && (
        <div
          className="animate-in fade-in slide-in-from-top-1 duration-200"
          role="dialog"
          aria-label="Container Search ID transaction"
        >
          <input
            aria-label="Input Search ID Transaction"
            id="name"
            type="text"
            placeholder="Cari transaksi..."
            className=" w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none transition focus:border-emerald-500/40 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className={`w-full h-auto px-4 py-2 mt-2 bg-gray-900 rounded-lg flex flex-col gap-4 ${search ? "block" : "hidden"}`}
          >
            {isFetchingSearchIdTransaction ? (
              <div
                aria-label="Is Loading Search"
                role="status"
                className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-500"
              >
                <Spokes className="size-4 animate-spin text-emerald-400" />
                <span>Dalam Progres...</span>
              </div>
            ) : (
              Array.isArray(SearchIdTransactionData) &&
              SearchIdTransactionData.length > 0 &&
              SearchIdTransactionData.map((i) => (
                <button
                  aria-label={`Search ID Transaction: ${i.id}`}
                  key={i.id}
                  className="text-white"
                  onClick={() => {
                    setSelected(i.initialName);
                    setValue("nameTransaction", i.initialName);
                    setIdExisted(i.id);
                    setShowSearch(false);
                  }}
                >
                  {i.initialName}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchIdTransaction;
