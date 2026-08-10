// import Footer from "./components/footer";
// import NewPostBtn from "./components/new-post-btn";

// type RootLayoutProps = {
//   children: React.ReactNode;
// };

// const MainLayout = ({ children }: RootLayoutProps) => {
//   return (
//     <>
//       <main className="flex flex-col items-center font-sans bg-black max-w-8xl min-h-screen relative pb-16">
//         {children}
//         <NewPostBtn />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default MainLayout;

import Footer from "./components/footer";
import NewPostBtn from "./components/new-post-btn";

type RootLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <main className="relative flex min-h-screen max-w-8xl flex-col items-center bg-[#050505] pb-16 font-sans text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />

          <div className="absolute bottom-[-200px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-100 w-full">{children}</div>

        <NewPostBtn />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
