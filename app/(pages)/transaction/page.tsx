import TransactionModalClient from "./transcation-modal-client";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import GetSession from "@/_lib/session";
import { GetTransactionList } from "@/_lib/services/transaction/services-transaction-index";

export const metadata: Metadata = {
  title: "Transaksi",
  description: "Halaman transaksi user.",
};

interface ITransactionPage {
  searchParams: Promise<{ s?: string; v?: string }>;
}

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const TransactionPage = async ({ searchParams }: ITransactionPage) => {
  const { v } = await searchParams;

  const queryClient = getQueryClient();

  const { publicId } = await GetSession();

  const date = getToday();

  const key = ["keyTransactionsList", publicId, v, date];

  await queryClient.prefetchInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) =>
      GetTransactionList({
        publicId: publicId,
        transactionName: v,
        convDate: date,
        offset: (pageParam - 1) * 10,
        limit: 15,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionModalClient />
    </HydrationBoundary>
  );
};

export default TransactionPage;
