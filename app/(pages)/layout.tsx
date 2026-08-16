import Footer from "./components/footer";
import NewPostBtn from "./components/new-post-btn";
import CookieBanner from "./auth/components/cookies-banner";

type RootLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <main className="relative flex min-h-screen max-w-8xl flex-col items-center bg-[#050505] pb-16 font-sans text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 -top-50 h-125 w-175 -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />

          <div className="absolute -bottom-50 -right-25 h-100 w-100 rounded-full bg-blue-500/4 blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-100 mx-auto w-full max-w-5xl">
          {/* <CookieBanner /> */}
          {children}

          <NewPostBtn />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
