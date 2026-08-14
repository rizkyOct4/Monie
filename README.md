# Monie

Monie adalah aplikasi manajemen keuangan pribadi yang dibuat untuk membantu pengguna mencatat, mengelola, dan memantau transaksi keuangan secara lebih terstruktur.

Aplikasi ini berfokus pada pencatatan pemasukan dan pengeluaran, pengelolaan saldo, serta penyajian laporan keuangan agar pengguna dapat memahami kondisi keuangannya dengan lebih mudah.

## ✨ Features

- 🔐 Authentication menggunakan Auth.js
- 💰 Pencatatan pemasukan dan pengeluaran
- 📝 Menambahkan informasi/keterangan transaksi
- 📅 Pengelolaan tanggal transaksi
- 💵 Pengelolaan initial salary / saldo awal
- 📊 Report dan insight keuangan
- 🔎 Search transaksi berdasarkan ID
- ✏️ Edit transaksi
- 🗑️ Delete transaksi
- 🖼️ Upload multiple images
- ☁️ Image storage menggunakan Cloudinary
- ⚡ Data fetching dan caching menggunakan TanStack React Query
- 🗄️ PostgreSQL sebagai database
- 🔷 Prisma ORM
- 🎨 Tailwind CSS
- 🧪 Unit dan component testing menggunakan Jest dan React Testing Library
- 📱 Responsive interface

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack React Query
- React Hook Form
- Zod
- Lucide React

### Backend

- Next.js Route Handlers
- Auth.js
- Prisma ORM
- PostgreSQL

### Storage

- Cloudinary

### Testing

- Jest
- React Testing Library
- Jest DOM
- MSW

### Deployment

- Vercel
- Neon PostgreSQL

---

## 📂 Project Structure

```text
app/
├── _components/
│   ├── auth/
│   ├── report/
│   ├── transaction/
│   └── ...
│
├── _hooks/
│   └── ...
│
├── _lib/
│   ├── prisma/
│   ├── ...
│   └── auth.ts
│
├── _utils/
│   └── ...
│
├── api/
│   └── transaction/
│       └── ...
│
├── transaction/
│   └── ...
│
├── report/
│   └── ...
│
├── layout.tsx
└── page.tsx

__tests__/
├── mocks/
├── components/
├── hooks/
└── ...

prisma/
└── schema.prisma

public/
└── ...

jest.setup.ts
next.config.ts
package.json
tsconfig.json