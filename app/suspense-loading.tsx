// "use client";

// import { Suspense } from "react";
// import Image from "next/image";
// import { TextShimmer } from "@/app/components/ui/text-shimmer";

// export const SuspenseLoading = ({ children }: any) => {
//   return (
//     <Suspense
//       fallback={
//         <div
//           className="
//             fixed inset-0 z-9999
//             flex items-center justify-center
//             bg-black/80 backdrop-blur-sm
//           "
//         >
//           <div className="flex items-center gap-3">
//             {/* LOGO */}
//             <div className="relative h-10 w-10 animate-pulse">
//               {/* <Image
//                 src="/sinarmudaLogo.png"
//                 alt="Sinarmuda Logo"
//                 fill
//                 sizes="40px"
//                 priority
//                 className="object-contain"
//               /> */}
//             </div>

//             {/* BRAND */}
//             <div className="flex flex-col leading-none">
//               <TextShimmer
//                 className="
//                   text-lg
//                   tracking-wide
//                   text-white
//                 "
//               >
//                 Monie
//               </TextShimmer>
//             </div>
//           </div>
//         </div>
//       }
//     >
//       {children}
//     </Suspense>
//   );
// };
