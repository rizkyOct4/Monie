"use client";

import { useContext } from "react";
import DateInput from "./components/header";
import TransactionList from "./components/transactions-list";
import { TransactionContext } from "@/app/context/context";
import TransactionListSkeleton from "./skeleton/skeleton-transactions";

const TransactionModalClient = () => {
  const {
    date,
    setDate,
    TransactionsListData,
    setIdTransaction,
    isFTransactionsListData,
  } = useContext(TransactionContext);

  return (
    <>
      <DateInput date={date} setDate={setDate} />
      {isFTransactionsListData ? (
        <TransactionListSkeleton />
      ) : (
        <TransactionList
          TransactionsListData={TransactionsListData}
          setIdTransaction={setIdTransaction}
        />
      )}
    </>
  );
};

export default TransactionModalClient;
