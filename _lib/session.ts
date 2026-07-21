import { auth } from "@/auth";

const GetSession = async () => {
  const token = await auth();
  const session = token?.user;
  const publicId = session?.publicId as string;
  const name = session?.name as string;
  //   const role = session?.role as string;
  // console.log(`token`, session)

  if (!session) return null;

  return {
    publicId,
    name,
    // role,
  };
};

export default GetSession;

// ? import { NextApiRequest, NextApiResponse } from "next"; -> ini di route handler

// todo TARGET COOKIES KAU DARI AUTHENTICATION !!
// todo PASTIKAN PAS SEMUA AUTH KAU !!

// todo penggunaan COOKIES di https request -> public kasih cookies !! private GET ga perlu, tapi pastikan sudah dilindungi middleware
// todo POST, PUT, DEL HARUS PAKAI COOKIES -> PRIVATE / PUBLIC HARUS PAKAI !!
