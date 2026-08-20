"use client";

import { ReactNode } from "react";
import { ReportContext } from "@/app/context/context";
import { useHookReport } from "../hook/hook-index";
import {usePathname} from "next/navigation";
import { useSessionClient } from "@/_lib/c-session";


interface ReportProviderProps {
  children: ReactNode;
}

const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
    const { publicId } = useSessionClient();
  
    const currentPath = usePathname();
  //   //   const currentPath = pathname.split("/")[2];
  const report = useHookReport(currentPath, publicId);

  const values = {
    ...report,
  };

  return (
    <ReportContext.Provider value={values}>{children}</ReportContext.Provider>
  );
};

export default ReportProvider;
