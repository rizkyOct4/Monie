"use client";

import { signOut } from "next-auth/react";
import {
  FaSignOutAlt,
  FaUser,
  FaWallet,
  FaBell,
  FaDatabase,
  FaShieldAlt,
  FaInfoCircle,
  FaChevronRight,
  FaDownload,
  FaUpload,
  FaTrash,
  FaLock,
  FaFingerprint,
  FaCheckCircle,
} from "react-icons/fa";

const SettingModal = () => {
  return (
    <main className="min-h-screen w-full bg-zinc-950 px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <FaUser className="text-sm text-emerald-400" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Pengaturan
              </h1>

              <p className="text-sm text-zinc-500">
                Kelola akun, keamanan, dan preferensi keuangan
              </p>
            </div>
          </div>
        </div>

        {/* Account */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-sm text-zinc-500" />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Profil
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Informasi akun kamu
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-zinc-300">
                B
              </div>

              <div>
                <p className="font-medium text-white">
                  Budi
                </p>

                <p className="text-sm text-zinc-500">
                  Budi@email.com
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                  <FaCheckCircle />
                  <span>Akun aktif</span>
                </div>
              </div>
            </div>

            <button
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300"
              onClick={async () =>
                await signOut({ redirectTo: "/" })
              }
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          </div>
        </section>

        {/* Keuangan */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <FaWallet className="text-sm text-emerald-400" />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Keuangan
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Atur preferensi finansial
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Mata Uang
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Mata uang utama transaksi
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                  IDR (Rp)
                </span>

                <FaChevronRight className="text-xs text-zinc-600" />
              </div>
            </button>

            {/* Bisa diaktifkan ketika fiturnya sudah tersedia */}
            {/*
            <button className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Gaji Bulanan
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Atur pemasukan utama
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>

            <button className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Target Tabungan
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Tentukan target finansial
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>
            */}
          </div>
        </section>

        {/* Notifikasi */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <FaBell className="text-sm text-zinc-400" />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Notifikasi
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Atur pengingat aktivitas keuangan
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <label className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-zinc-800/70">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Pengingat Catat Transaksi
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Ingatkan ketika belum mencatat transaksi
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-emerald-500"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-zinc-800/70">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Pengingat Tabungan
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Ingatkan target tabungan secara berkala
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-emerald-500"
              />
            </label>
          </div>
        </section>

        {/* Data */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <FaDatabase className="text-sm text-zinc-400" />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Data
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Kelola dan amankan data keuangan
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaDownload className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Export Excel
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Download transaksi dalam format Excel
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaDownload className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Export PDF
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Download laporan keuangan
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaDatabase className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Backup Data
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Simpan salinan data secara manual
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaUpload className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Restore Data
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Pulihkan data dari file backup
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>
          </div>
        </section>

        {/* Keamanan */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-sm text-emerald-400" />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Keamanan
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Lindungi akses ke akunmu
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaLock className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Ubah PIN
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Ganti PIN keamanan aplikasi
                </p>
              </div>

              <FaChevronRight className="text-xs text-zinc-600" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-zinc-800/70">
              <FaFingerprint className="text-xs text-zinc-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  Aktifkan Biometrik
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Gunakan sidik jari atau Face ID
                </p>
              </div>

              <span className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-500">
                Segera
              </span>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/[0.03]">
          <div className="border-b border-red-500/10 px-5 py-4">
            <h2 className="text-sm font-semibold text-red-400">
              Danger Zone
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Tindakan berikut dapat memengaruhi atau menghapus data akun.
            </p>
          </div>

          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition hover:bg-red-500/10">
              <FaTrash className="text-xs text-red-400" />

              <div className="flex-1">
                <p className="text-sm font-medium text-red-400">
                  Hapus Semua Data
                </p>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Hapus seluruh transaksi dan data keuangan
                </p>
              </div>

              <FaChevronRight className="text-xs text-red-500/50" />
            </button>
          </div>
        </section>

        {/* Tentang */}
        <section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="flex items-center gap-3">
            <FaInfoCircle className="text-sm text-zinc-500" />

            <div>
              <h2 className="text-sm font-semibold text-white">
                Tentang
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                Informasi aplikasi
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
            <span className="text-sm text-zinc-400">
              Versi aplikasi
            </span>

            <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-500">
              1.0.0
            </span>
          </div>

          <div className="mt-3 flex gap-4 text-xs text-zinc-600">
            <button className="transition hover:text-zinc-300">
              Ketentuan Layanan
            </button>

            <button className="transition hover:text-zinc-300">
              Kebijakan Privasi
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SettingModal;