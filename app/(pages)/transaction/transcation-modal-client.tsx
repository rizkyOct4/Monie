"use client";

import { useContext } from "react";
import DateInput from "./components/header";
import TransactionList from "./components/transactions-list";
import { TransactionContext } from "@/app/context/context";
import TransactionListSkeleton from "./skeleton/skeleton-transactions";

const TransactionModalClient = () => {
  const { date, setDate, TransactionsListData, isFTransactionsListData } =
    useContext(TransactionContext);

  return (
    <div className="flex flex-col gap-4 py-4 min-h-screen relative">
      <DateInput date={date} setDate={setDate} />
      {isFTransactionsListData ? (
        <TransactionListSkeleton />
      ) : (
        <TransactionList TransactionsListData={TransactionsListData} />
      )}
    </div>
  );
};

export default TransactionModalClient;
