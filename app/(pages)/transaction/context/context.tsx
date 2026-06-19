"use client";

import { ReactNode } from "react";
import { TransactionContext } from "@/app/context/context";
import { useSessionClient } from "@/_lib/c-session";
import { useTransactionHook } from "../hook/hook-index";
import { usePathname } from "next/navigation";

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const { publicId } = useSessionClient();

  const currentPath = usePathname();
  //   const currentPath = pathname.split("/")[2];
  const transaction = useTransactionHook(publicId, currentPath);

  const values = {
    ...transaction,
  };

  return (
    <TransactionContext.Provider value={values}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
