"use client";

import { useState, useCallback } from "react";
import FormPut from "./form-put";

type FormPutProps = {
  idTransaction: string;
  onBack: () => void;
};

const FormPutTransactions = ({ idTransaction, onBack }: FormPutProps) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className=" w-full max-w-lg h-[80vh] overflow-y-auto bg-white p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">
            Perbarui Transaksi
          </h2>
          <button
            onClick={onBack}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <FormPut idTransaction={idTransaction} onBack={() => onBack()} />
        </div>
      </div>
    </div>
  );
};

export default FormPutTransactions;
