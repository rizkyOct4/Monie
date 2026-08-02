"use client";

import { useState, useCallback, memo } from "react";
import NewTransaction from "./new-transaction";
import ExistedTransactions from "./existed-transaction";
import { X } from "lucide-react";

type OptionsFormPostProps = {
  onClose: () => void;
};

const OptionsFormPost = ({ onClose }: OptionsFormPostProps) => {
  const [isNewTransaction, setIsNewTransaction] = useState("Existed");
  const [showInfo, setShowInfo] = useState(false);

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "newTransaction": {
        setIsNewTransaction((prev) => (prev !== "Existed" ? "New" : "Existed"));
        break;
      }
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-label="Container Options Form Post"
      aria-modal="true"
      aria-labelledby="options-form-post"
    >
      <div className=" w-full max-w-lg h-[80vh] overflow-y-auto bg-white p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2
            className="text-xl font-semibold text-black"
            id="options-form-post"
          >
            Tambah Transaksi
          </h2>

          <button
            aria-label={`Handler Options Btn ${isNewTransaction}`}
            onClick={() => handleAction("newTransaction")}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            {isNewTransaction ? "Existed" : "New"}
          </button>
          <button
            aria-label="Close Btn"
            onClick={onClose}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {isNewTransaction ? (
            <NewTransaction
              showInfo={showInfo}
              onInfo={() => setShowInfo((prev) => !prev)}
              onClose={() =>
                setIsNewTransaction((prev) =>
                  prev !== "Existed" ? "New" : "Existed",
                )
              }
            />
          ) : (
            <ExistedTransactions onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(OptionsFormPost);
