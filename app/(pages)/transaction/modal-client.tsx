"use client";

import { useState, useCallback } from "react";
// * =============
import TransactionHeader from "./header";
// import FormPost from "../components/form";

const ModalClient = () => {
  // const [isPost, setIsPost] = useState(false);

  return (
    <div className="mx-auto flex w-full flex-col">
      <TransactionHeader />

      {/* Riwayat */}
      <section className="overflow-hidden bg-white">
        <div className="border-b border-zinc-100 p-5">
          <h2 className="text-lg font-semibold text-zinc-900">
            Riwayat Transaksi
          </h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between p-5">
            <div className="flex flex-col">
              <h3 className="font-medium text-zinc-900">Makan Siang</h3>

              <span className="text-sm text-zinc-500">Rabu, 11 Juni 2026</span>
            </div>

            <span className="font-semibold text-red-500">- Rp 25.000</span>
          </div>

          <div className="border-t border-zinc-100" />

          <div className="flex items-center justify-between p-5">
            <div className="flex flex-col">
              <h3 className="font-medium text-zinc-900">Freelance Website</h3>

              <span className="text-sm text-zinc-500">
                Selasa, 10 Juni 2026
              </span>
            </div>

            <span className="font-semibold text-emerald-500">+ Rp 500.000</span>
          </div>

          <div className="border-t border-zinc-100" />

          <div className="flex items-center justify-between p-5">
            <div className="flex flex-col">
              <h3 className="font-medium text-zinc-900">Bensin</h3>

              <span className="text-sm text-zinc-500">Senin, 09 Juni 2026</span>
            </div>

            <span className="font-semibold text-red-500">- Rp 50.000</span>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ModalClient;
