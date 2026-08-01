import TransactionModalClient from "./transcation-modal-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaksi | My App",
  description: "Halaman transaksi user.",
};

const TransactionPage = () => {
  return <TransactionModalClient />;
};

export default TransactionPage;
