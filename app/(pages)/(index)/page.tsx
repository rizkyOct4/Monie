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
    <main className="flex flex-col gap-6 px-6 py-4">
      {/* Header */}
      <section className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Ringkasan keuangan bulan ini
        </p>
      </section>

      {/* Hero Card */}
      <section
        className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-zinc-900
          p-8
          text-white
          shadow-lg
        "
      >
        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-400">Total Saldo</span>

          <h2 className="text-5xl font-bold tracking-tight">Rp 3.000.000</h2>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="
                rounded-full
                bg-emerald-500/20
                px-3
                py-1
                text-xs
                font-medium
                text-emerald-300
              "
            >
              +12%
            </span>

            <span className="text-sm text-zinc-400">dibanding bulan lalu</span>
          </div>
        </div>

        <div
          className="
            absolute
            -top-10
            -right-10
            h-40
            w-40
            rounded-full
            bg-white/5
          "
        />
      </section>

      {/* Summary */}
      <section className="flex flex-wrap gap-4">
        <div
          className="
            min-w-56
            flex-1
            rounded-3xl
            border
            border-zinc-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-zinc-500">Total Pemasukan</p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-600">
            Rp 500.000
          </h3>
        </div>

        <div
          className="
            min-w-56
            flex-1
            rounded-3xl
            border
            border-zinc-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-zinc-500">Total Pengeluaran</p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">Rp 2.500.000</h3>
        </div>
      </section>

      {/* Target Tabungan */}
      <section
        className="
          rounded-3xl
          border
          border-zinc-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900">Target Tabungan</h2>

          <span className="text-sm font-medium text-zinc-700">60%</span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-[60%] rounded-full bg-zinc-900" />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
          <span>Rp 3.000.000</span>
          <span>Target Rp 5.000.000</span>
        </div>
      </section>

      {/* Insight */}
      <section
        className="
          rounded-3xl
          border
          border-amber-200
          bg-amber-50
          p-5
        "
      >
        <h2 className="font-semibold text-amber-900">Insight Bulan Ini</h2>

        <p className="mt-2 text-sm leading-relaxed text-amber-700">
          Pengeluaran Anda masih berada di bawah 50% dari total pemasukan.
          Kondisi keuangan saat ini cukup sehat dan target tabungan masih berada
          pada jalur yang baik.
        </p>
      </section>

      {/* Recent Transaction */}
      <section
        className="
          rounded-3xl
          border
          border-zinc-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900">Transaksi Terakhir</h2>

          <button
            className="
              text-sm
              font-medium
              text-zinc-500
              transition
              hover:text-zinc-900
            "
          >
            Lihat Semua
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-200
                p-4
                transition
                hover:bg-zinc-50
              "
            >
              <div className="flex flex-col">
                <h3 className="font-medium text-zinc-900">{item.title}</h3>

                <span className="text-xs text-zinc-500">{item.date}</span>
              </div>

              <span
                className={`font-semibold ${
                  item.type === "income" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"} Rp {item.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
