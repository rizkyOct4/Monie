"use client";

import { useState, useCallback, useContext } from "react";
// * =============
import CustomDateInput from "./components/header";
import TransactionList from "./components/transactions-list";
import { TransactionContext } from "@/app/context/context";

const ModalClient = () => {
  const { TransactionsListData } = useContext(TransactionContext);

  return (
    <>
      <CustomDateInput />
      <TransactionList TransactionsListData={TransactionsListData} />
    </>
  );
};

export default ModalClient;
