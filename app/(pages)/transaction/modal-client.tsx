"use client";

import { useState, useCallback } from "react";
// * =============
import TransactionHeader from "./header";
// import FormPost from "../components/form";

const ModalClient = () => {
  // const [isPost, setIsPost] = useState(false);

  return (
    <main className="flex flex-col px-6 w-full">
      <TransactionHeader />
      <section>
        <div className="pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Riwayat Transaksi
          </h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-100 py-4">
            <div>
              <h3 className="font-medium text-black">Makan Siang</h3>

              <p className="mt-1 text-xs text-zinc-500">Rabu, 11 Juni 2026</p>
            </div>

            <div className="text-right">
              <p className="font-medium text-red-500">- Rp 25.000</p>

              <p className="text-xs text-zinc-500">Makanan</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-100 py-4">
            <div>
              <h3 className="font-medium text-black">Freelance Website</h3>

              <p className="mt-1 text-xs text-zinc-500">Selasa, 10 Juni 2026</p>
            </div>

            <div className="text-right">
              <p className="font-medium text-emerald-600">+ Rp 500.000</p>

              <p className="text-xs text-zinc-500">Pemasukan</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-black">Bensin</h3>

              <p className="mt-1 text-xs text-zinc-500">Senin, 09 Juni 2026</p>
            </div>

            <div className="text-right">
              <p className="font-medium text-red-500">- Rp 50.000</p>

              <p className="text-xs text-zinc-500">Transportasi</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ModalClient;
