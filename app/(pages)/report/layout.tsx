import ReportProvider from "./context/context";
import HeaderReport from "./components/header";

type ReportPageLayoutProps = {
  children: React.ReactNode;
};

const ReportPageLayout = ({ children }: ReportPageLayoutProps) => {
  return (
    <ReportProvider>
      <main className="flex flex-col p-6 w-full min-h-screen relative gap-4">
        <HeaderReport />
        {children}
      </main>
    </ReportProvider>
  );
};

export default ReportPageLayout;
