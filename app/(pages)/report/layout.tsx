import ReportProvider from "./context/context";

type ReportPageLayoutProps = {
  children: React.ReactNode;
};

const ReportPageLayout = ({ children }: ReportPageLayoutProps) => {
  return <ReportProvider>{children}</ReportProvider>;
};

export default ReportPageLayout;
