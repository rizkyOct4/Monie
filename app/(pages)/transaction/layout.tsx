import TransactionProvider from "./context/context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <TransactionProvider>{children}</TransactionProvider>;
};

export default Layout;
