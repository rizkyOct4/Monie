"use client"


import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

export const useUserQuery = ({
  publicId,
  pathname,
}: any) => {
  const { data: fUser } = useQuery({
    queryKey: ["keyUsers", publicId],
    // queryFn: async () => {
    //   const limit = 5;
    //   const URL = ROUTES_INDEX.GET({ key: "index", limit });
    //   const { data } = await axios.get(URL);
    //   return data;
    // },
    staleTime: 1000 * 60 * 5,
    // enabled: pathname === "/",
    gcTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

//   const imageHeroData:ImageHeroData[] = useMemo(() => imageHero ?? [], [imageHero]);

  return { fUser };
};

