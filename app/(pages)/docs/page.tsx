import type { Metadata } from "next";
import DocsIndex from "./components";

export const metadata: Metadata = {
  title: "Dokumentasi",
  description:
    "Dokumentasi Monie untuk memahami fitur, cara kerja, dan penggunaan aplikasi keuangan.",
};

const DocsPage = () => {
  return <DocsIndex />;
};

export default DocsPage;
