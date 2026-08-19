"use client";

import { useContext } from "react";
import HeaderTransaction from "./components/header";
import TransactionList from "./components/transactions-list";
import { TransactionContext } from "@/app/context/context";
import TransactionListSkeleton from "./skeleton/skeleton-transactions";

const TransactionModalClient = () => {
  const {
    date,
    setDate,
    TransactionsListData,
    isFTransactionsListData,
    FNPTransactionsList,
    HNPTransactionList,
    IFNPTransactionList
  } = useContext(TransactionContext);

  return (
    <div className="flex flex-col gap-4 py-4 relative">
      <HeaderTransaction date={date} setDate={setDate} />
      {isFTransactionsListData ? (
        <TransactionListSkeleton />
      ) : (
        <TransactionList
          TransactionsListData={TransactionsListData}
          fetchNextPage={FNPTransactionsList}
          hasNextPage={HNPTransactionList}
          isFetchingNextPage={IFNPTransactionList}
        />
      )}
    </div>
  );
};

export default TransactionModalClient;
