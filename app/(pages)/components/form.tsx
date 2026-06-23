"use client";

import { useState, useCallback } from "react";
import NewTransactions from "./new-transaction";
import Transactions from "./transaction";

type FormPostProps = {
  onBack: () => void;
};

const FormPost = ({ onBack }: FormPostProps) => {
  const [isNewTransaction, setIsNewTransaction] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "newTransaction": {
        setIsNewTransaction((prev) => !prev);
        break;
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className=" w-full max-w-lg h-[80vh] overflow-y-auto bg-white p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Tambah Transaksi</h2>

          <button
            onClick={() => handleAction("newTransaction")}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            {isNewTransaction ? "- Current" : "+ New"}
          </button>
          <button
            onClick={onBack}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {isNewTransaction ? (
            <NewTransactions showInfo={showInfo} setShowInfo={setShowInfo} setIsNewTransaction={setIsNewTransaction}/>
          ) : (
            <Transactions isNewTransaction={isNewTransaction} onBack={onBack}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPost;
