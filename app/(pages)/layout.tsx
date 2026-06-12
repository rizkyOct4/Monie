import Footer from "./components/footer";
import NewPostBtn from "./components/new-post";

type RootLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <main className="flex flex-col items-center font-sans bg-black max-w-8xl min-h-screen relative pb-20 pt-4">
        {children}
        <NewPostBtn />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
