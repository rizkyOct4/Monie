"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileChartColumn,
  Lightbulb,
  Plus,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Catat Transaksi",
    description:
      "Simpan pemasukan dan pengeluaran dengan informasi tanggal, nominal, keterangan, dan lampiran gambar.",
  },
  {
    icon: BarChart3,
    title: "Pantau Keuangan",
    description:
      "Lihat kondisi keuangan secara lebih jelas melalui saldo, pemasukan, pengeluaran, dan persentase penggunaan uang.",
  },
  {
    icon: FileChartColumn,
    title: "Laporan Keuangan",
    description:
      "Analisis transaksi berdasarkan periode tertentu untuk memahami bagaimana uang digunakan.",
  },
  {
    icon: Lightbulb,
    title: "Insight Keuangan",
    description:
      "Dapatkan gambaran seperti pengeluaran terbesar, rata-rata pengeluaran, dan hari dengan pengeluaran tertinggi.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tambahkan Transaksi",
    description:
      "Masukkan transaksi baru dengan nominal, tanggal, keterangan, dan foto jika diperlukan.",
  },
  {
    number: "02",
    title: "Biarkan Data Tersusun",
    description:
      "Setiap transaksi tersimpan dan dapat dikelola kembali ketika terjadi perubahan.",
  },
  {
    number: "03",
    title: "Baca Kondisi Keuangan",
    description:
      "Gunakan dashboard dan laporan untuk melihat pola pengeluaran serta kondisi saldo.",
  },
  {
    number: "04",
    title: "Ambil Keputusan",
    description:
      "Gunakan insight yang tersedia untuk membantu menentukan prioritas keuangan berikutnya.",
  },
];

const benefits = [
  "Tidak perlu mengingat semua transaksi secara manual",
  "Lebih mudah mengetahui ke mana uang digunakan",
  "Dapat melihat kondisi keuangan berdasarkan periode",
  "Transaksi dapat diperbarui dan dihapus",
  "Dapat menyimpan lampiran foto pada transaksi",
  "Insight membantu membaca pola pengeluaran",
];

export default function DocsIndex() {
  return (
    <main className="min-h-screen text-white">
      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black">
              <CircleDollarSign size={18} />
            </div>

            <span>Finance</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
          >
            Kembali
            <ChevronRight size={16} />
          </Link>
        </nav>

        {/* HERO */}
        <section className="mx-auto max-w-4xl py-24 text-center sm:py-32">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Kelola keuangan dengan lebih sadar
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Uang Anda seharusnya
            <span className="block text-emerald-400">mudah dipahami.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Aplikasi ini membantu Anda mencatat transaksi, memantau saldo,
            membaca pola pengeluaran, dan memahami kondisi keuangan tanpa
            membuat pengelolaan uang terasa rumit.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/transaction"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Mulai Catat Transaksi
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/report"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              Lihat Laporan
            </Link>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="border-t border-white/10 py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Kenapa aplikasi ini?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Mengetahui saldo saja tidak cukup.
              </h2>
            </div>

            <div className="w-full space-y-5 text-sm leading-7 text-zinc-400 lg:w-1/2">
              <p>
                Banyak orang mengetahui berapa uang yang mereka miliki, tetapi
                tidak benar-benar mengetahui ke mana uang tersebut pergi.
              </p>

              <p>
                Transaksi kecil yang dilakukan setiap hari dapat terakumulasi
                menjadi pengeluaran besar. Tanpa pencatatan dan analisis, pola
                tersebut sulit terlihat.
              </p>

              <p className="text-zinc-300">
                Aplikasi ini dibuat untuk mengubah transaksi sehari-hari menjadi
                informasi yang lebih mudah dipahami.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-t border-white/10 py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Fitur utama
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Semua yang dibutuhkan untuk memahami keuangan.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Fokus aplikasi ini bukan membuat pengelolaan keuangan menjadi
              rumit, tetapi memberikan informasi yang cukup untuk membantu Anda
              mengambil keputusan.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group w-full rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-emerald-500/20 hover:bg-white/[0.04] sm:w-[calc(50%-0.5rem)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-5 font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-t border-white/10 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Cara kerja
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Mulai dalam beberapa langkah.
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
              >
                <span className="text-sm font-bold text-emerald-400">
                  {step.number}
                </span>

                <h3 className="mt-5 font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT YOU CAN SEE */}
        <section className="border-t border-white/10 py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Lebih dari sekadar pencatatan
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Data transaksi berubah menjadi gambaran keuangan.
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                Setelah transaksi tercatat, Anda dapat menggunakan dashboard dan
                laporan untuk melihat kondisi keuangan secara lebih menyeluruh.
              </p>
            </div>

            <div className="w-full rounded-3xl border border-white/10 bg-zinc-950 p-5 shadow-2xl lg:w-1/2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">
                      Kesehatan Finansial
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      Kondisi Keuangan
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Sisa Saldo</span>

                      <span className="text-emerald-400">78%</span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="w-full rounded-xl border border-white/10 bg-black/30 p-4 sm:w-[calc(50%-0.375rem)]">
                      <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                        Transaksi
                      </p>

                      <p className="mt-2 text-lg font-semibold">24</p>
                    </div>

                    <div className="w-full rounded-xl border border-white/10 bg-black/30 p-4 sm:w-[calc(50%-0.375rem)]">
                      <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                        Pengeluaran
                      </p>

                      <p className="mt-2 text-lg font-semibold text-red-400">
                        Rp850K
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.04] p-4">
                    <div className="flex gap-3">
                      <Lightbulb
                        size={18}
                        className="shrink-0 text-amber-400"
                      />

                      <p className="text-xs leading-5 text-zinc-400">
                        Pengeluaran terbesar dan pola transaksi dapat membantu
                        Anda mengetahui bagian keuangan yang perlu diperhatikan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="border-t border-white/10 py-20">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Apa yang Anda dapatkan?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Lebih sadar sebelum mengambil keputusan.
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                Tujuan akhirnya bukan sekadar memiliki banyak data, tetapi
                memiliki pemahaman yang lebih baik mengenai kondisi keuangan
                Anda.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-1/2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Check size={14} />
                  </div>

                  <span className="text-sm text-zinc-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.06] p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[80px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-black">
                <Plus size={24} />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Mulai memahami keuangan Anda.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                Tidak perlu menunggu sampai kondisi keuangan menjadi rumit.
                Mulai dari satu transaksi, kemudian lihat bagaimana data
                tersebut membantu Anda memahami kebiasaan finansial.
              </p>

              <Link
                href="/transaction"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                Catat Transaksi Pertama
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Kelola uang. Pahami kebiasaan. Ambil keputusan lebih baik.</p>

          <div className="flex gap-5">
            <Link
              href="/transaction"
              className="transition hover:text-zinc-300"
            >
              Transaksi
            </Link>

            <Link
              href="/report"
              className="transition hover:text-zinc-300"
            >
              Laporan
            </Link>

            <Link
              href="/setting"
              className="transition hover:text-zinc-300"
            >
              Pengaturan
            </Link>

            <a
              href="/cv/CV_Rizky_Octa_Arinda.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-emerald-400"
            >
              About Developer ↗
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}