const categories = [
  {
    name: "Makan & Minum",
    amount: 700000,
    percentage: 35,
  },
  {
    name: "Transportasi",
    amount: 500000,
    percentage: 25,
  },
  {
    name: "Belanja",
    amount: 400000,
    percentage: 20,
  },
  {
    name: "Tagihan",
    amount: 300000,
    percentage: 15,
  },
  {
    name: "Lainnya",
    amount: 100000,
    percentage: 5,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ReportPage() {
  return (
    <main className="flex flex-col px-6 py-4 w-full">
      {/* Header */}
      <section className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Laporan
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Analisis keuangan bulan Juni 2026
          </p>
        </div>

        <button className="border border-zinc-200 px-3 py-2 text-sm text-white">
          Juni 2026
        </button>
      </section>

      {/* Kesehatan Finansial */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Kesehatan Finansial
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>Persentase Tabungan</span>

            <span className="font-medium text-black">
              55%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Persentase Pengeluaran</span>

            <span className="font-medium text-black">
              45%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <span className="font-medium text-emerald-600">
              Baik
            </span>
          </div>
        </div>
      </section>

      {/* Kategori Pengeluaran */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Kategori Pengeluaran
        </h2>

        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-black">
                  {category.name}
                </p>

                <p className="text-xs text-zinc-500 bg-white">
                  {category.percentage}%
                </p>
              </div>

              <span className="font-medium text-black">
                {formatCurrency(category.amount)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Perbandingan */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Dibanding Bulan Lalu
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>Pemasukan</span>

            <span className="text-emerald-600">
              +10%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Pengeluaran</span>

            <span className="text-red-500">
              +18%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tabungan</span>

            <span className="text-blue-600">
              -5%
            </span>
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Insight
        </h2>

        <div className="flex flex-col gap-3 text-sm text-zinc-600">
          <p>
            Pengeluaran makan & minum menjadi kategori terbesar bulan ini.
          </p>

          <p>
            Pengeluaran meningkat 18% dibanding bulan lalu.
          </p>

          <p>
            Rasio tabungan berada di angka 55% dan masih tergolong sehat.
          </p>

          <p>
            Pertahankan rasio tabungan di atas 50% untuk mencapai target lebih cepat.
          </p>
        </div>
      </section>
    </main>
  );
}