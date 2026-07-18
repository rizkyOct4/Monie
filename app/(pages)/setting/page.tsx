export default function SettingPage() {
  const test12 = () => {
    return console.log("test");
  };

  return (
    <main className="flex flex-col px-6 py-4 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pengaturan</h1>

        <p className="mt-1 text-sm text-zinc-500">
          Kelola preferensi aplikasi dan data keuangan
        </p>
      </div>

      {/* Profil */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Profil
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Rizky</p>

            <p className="text-sm text-zinc-500">rizky@email.com</p>
          </div>

          <button className="text-sm font-medium">Edit</button>
        </div>
      </section>

      {/* Keuangan */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Keuangan
        </h2>

        <div className="flex flex-col">
          {/* <button className="flex items-center justify-between py-4">
            <span>Gaji Bulanan</span>
            <span className="text-zinc-500">
              Rp 5.000.000
            </span>
          </button>

          <button className="flex items-center justify-between py-4">
            <span>Target Tabungan</span>
            <span className="text-zinc-500">
              Rp 10.000.000
            </span>
          </button> */}

          <button className="flex items-center justify-between py-4">
            <span>Mata Uang</span>
            <span className="text-zinc-500">IDR (Rp)</span>
          </button>
        </div>
      </section>

      {/* Notifikasi */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Notifikasi
        </h2>

        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between">
            <span>Pengingat Catat Transaksi</span>

            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between">
            <span>Pengingat Tabungan</span>

            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </section>

      {/* Data */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Data
        </h2>

        <div className="flex flex-col">
          <button className="py-4 text-left">Export Excel</button>

          <button className="py-4 text-left">Export PDF</button>

          <button className="py-4 text-left">Backup Data</button>

          <button className="py-4 text-left">Restore Data</button>
        </div>
      </section>

      {/* Keamanan */}
      <section className="border-b border-zinc-200 py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Keamanan
        </h2>

        <div className="flex flex-col">
          <button className="py-4 text-left">Ubah PIN</button>

          <button className="py-4 text-left">Aktifkan Biometrik</button>
        </div>
      </section>

      {/* Tentang */}
      <section className="py-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Tentang
        </h2>

        <p className="text-sm text-zinc-500">Versi 1.0.0</p>
      </section>
    </main>
  );
}

// todo GASKAN BESOK SAMA KAU UNIT TEST !!!! PAKAI JEST
