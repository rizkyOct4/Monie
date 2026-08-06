import { auth } from "@/auth";

const GetSession = async () => {
  const token = await auth();
  const session = token?.user;
  const publicId = session?.publicId as string;
  const name = session?.name as string;

  return {
    publicId,
    name,
  };
};

export default GetSession;


// todo TARGET COOKIES KAU DARI AUTHENTICATION !!
// todo PASTIKAN PAS SEMUA AUTH KAU !!

// todo penggunaan COOKIES di https request -> public kasih cookies !! private GET ga perlu, tapi pastikan sudah dilindungi middleware
// todo POST, PUT, DEL HARUS PAKAI COOKIES -> PRIVATE / PUBLIC HARUS PAKAI !!
