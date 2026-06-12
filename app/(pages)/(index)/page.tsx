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
    <main className="flex flex-col px-6 py-4 w-full">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="mt-1 text-sm text-zinc-500">
          Ringkasan keuangan bulan ini
        </p>
      </section>

      {/* Saldo */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Saldo Saat Ini
        </h2>

        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-4xl font-bold text-white">Rp 3.000.000</h3>

            <p className="mt-2 text-sm text-emerald-600">
              +12% dibanding bulan lalu
            </p>
          </div>
        </div>
      </section>

      {/* Ringkasan */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Ringkasan Bulan Ini
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>Total Pemasukan</span>

            <span className="font-semibold text-emerald-600">Rp 500.000</span>
          </div>

          <div className="flex justify-between">
            <span>Total Pengeluaran</span>

            <span className="font-semibold text-red-500">Rp 2.500.000</span>
          </div>

          <div className="flex justify-between">
            <span>Sisa Saldo</span>

            <span className="font-semibold text-blue-600">Rp 3.000.000</span>
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Target Tabungan
        </h2>

        <div className="flex justify-between">
          <span>Pencapaian</span>

          <span className="font-medium">60%</span>
        </div>

        <div className="mt-3 flex justify-between text-sm text-zinc-500">
          <span>Rp 3.000.000</span>

          <span>Target Rp 5.000.000</span>
        </div>
      </section>

      {/* Insight */}
      <section className="py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Insight
        </h2>

        <div className="flex flex-col gap-2 text-sm text-zinc-600">
          <p>Pengeluaran masih berada di bawah 50% dari total pemasukan.</p>

          <p>Target tabungan masih berada pada jalur yang baik.</p>

          <p>Kondisi keuangan bulan ini tergolong sehat.</p>
        </div>
      </section>
    </main>
  );
}
