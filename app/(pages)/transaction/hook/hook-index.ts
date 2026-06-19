"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useMutationTransaction } from "./mutation/mutation-index";

export const useTransactionHook = (publicId: string, currentPath: string) => {
  // * MUTATION =======
  const MPost = useMutationTransaction();

  return { ...MPost };
};
