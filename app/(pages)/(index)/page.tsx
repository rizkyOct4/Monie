const transactions = [
  {
    id: 1,
    title: "Freelance Website",
    date: "10 Juni 2026",
    amount: "500.000",
    type: "income",
  },
  {
    id: 2,
    title: "Makan Siang",
    date: "11 Juni 2026",
    amount: "25.000",
    type: "expense",
  },
  {
    id: 3,
    title: "Bensin",
    date: "09 Juni 2026",
    amount: "50.000",
    type: "expense",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
      <div className="w-full">
        {/* Header */}
        <section className="mb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                  <span className="text-sm font-semibold text-emerald-400">
                    Rp
                  </span>
                </div>

                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-white">
                    Dashboard
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    Ringkasan keuangan bulan ini
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-500">
              Juni 2026
            </div>
          </div>
        </section>

        {/* Saldo Utama */}
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Saldo Saat Ini
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                  Rp 3.000.000
                </h2>

                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                    +12%
                  </span>

                  <span className="text-sm text-zinc-500">
                    dibanding bulan lalu
                  </span>
                </div>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 sm:flex">
                <span className="text-lg text-emerald-400">
                  ↗
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Ringkasan */}
        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Income */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Total Pemasukan
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                ↗
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold text-emerald-400">
              Rp 500.000
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Pemasukan bulan ini
            </p>
          </div>

          {/* Expense */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Total Pengeluaran
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                ↘
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold text-red-400">
              Rp 2.500.000
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Pengeluaran bulan ini
            </p>
          </div>

          {/* Remaining */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Sisa Saldo
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                $
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold text-blue-400">
              Rp 3.000.000
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Dana yang tersedia
            </p>
          </div>
        </section>

        {/* Financial Overview */}
        <section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-white">
              Financial Overview
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Perbandingan pemasukan dan pengeluaran
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Pemasukan
                </span>

                <span className="text-xs font-medium text-emerald-400">
                  Rp 500.000
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[20%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Pengeluaran
                </span>

                <span className="text-xs font-medium text-red-400">
                  Rp 2.500.000
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[80%] rounded-full bg-red-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Target */}
        <section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Target Tabungan
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Progress menuju target finansial
              </p>
            </div>

            <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              60%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-[60%] rounded-full bg-emerald-500" />
          </div>

          <div className="mt-3 flex justify-between text-xs">
            <span className="font-medium text-zinc-300">
              Rp 3.000.000
            </span>

            <span className="text-zinc-500">
              Target Rp 5.000.000
            </span>
          </div>
        </section>

        {/* Transaksi Terbaru */}
        <section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Transaksi Terbaru
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Aktivitas keuangan terbaru
              </p>
            </div>

            <span className="text-xs text-zinc-600">
              {transactions.length} transaksi
            </span>
          </div>

          <div className="flex flex-col">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-zinc-800 py-4 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      transaction.type === "income"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "↗" : "↘"}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {transaction.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}Rp{" "}
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Insight */}
        <section className="mt-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              ✦
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Insight
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Analisis kondisi keuangan
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-sm leading-6 text-zinc-400">
                Pengeluaran masih berada di bawah 50% dari
                total pemasukan.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-sm leading-6 text-zinc-400">
                Target tabungan masih berada pada jalur yang
                baik.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <p className="text-sm leading-6 text-emerald-300">
                Kondisi keuangan bulan ini tergolong sehat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
