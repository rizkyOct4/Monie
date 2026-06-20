import TransactionProvider from "./context/context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransactionProvider>
      <main className="flex flex-col px-6 w-full relative">{children}</main>
    </TransactionProvider>
  );
};

export default Layout;
