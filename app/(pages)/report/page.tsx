import type { Metadata } from "next";
import ReportClient from "./components";

export const metadata: Metadata = {
  title: "Laporan | My App",
  description: "Halaman laporan keuangan pengguna.",
};

const ReportPage = () => {
  return <ReportClient />;
};

export default ReportPage;