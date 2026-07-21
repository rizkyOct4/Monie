"use client";

import { ReactNode } from "react";
import { ReportContext } from "@/app/context/context";
import { useHookReport } from "../hook/hook-index";

interface ReportProviderProps {
  children: ReactNode;
}

const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  //   const currentPath = usePathname();
  //   //   const currentPath = pathname.split("/")[2];
  const report = useHookReport();

  const values = {
    ...report,
  };

  return (
    <ReportContext.Provider value={values}>{children}</ReportContext.Provider>
  );
};

export default ReportProvider;
