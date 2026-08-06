import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  OAuthRegister,
} from "./_lib/services/auth/services-auth";
import type { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, // ? 0.5 hari -> login bertahan
    // updateAge: 60 * 60 * 12, // ? refreshh login
  },
  ...authConfig,
  // debug: true, // This prints exact errors in the server logs
  // ? jwt -> INI DATA SECRET YG AKAN DIKIRIM KE COOKIES !!!
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // ! user -> credential, profile -> OAuth
      // ? credentials login → user berisi data dari authorize
      if (user) {
        token.publicId = user.publicId;
        token.name = user.name;
      }

      // ? OAuth login → user hanya berisi data dasar
      if (account && profile) {
        const fullname = profile.name as string;

        const email = profile.email ?? "";
        const profilePicture = profile.picture;

        const fetch = await OAuthRegister({
          email: email,
          fullname: fullname,
          imageUrl: profilePicture,
          createdAt: new Date(),
        });

        token.publicId = fetch[0].publicId;
        token.name = profile.name as string;
      }

      // console.log(`token sesion`, token);
      return token;
    },
    // ? INI YG AKAN DIGUNAKNA DI CLIENT !!
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.publicId = token.publicId;
        session.user.name = token.name;

        delete session.user.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

// ? TOKEN DARI AUTH.js ??? user -> users sendiri ???
// * token -> decode masukkan ke cookies !!! profile / account baru dari OAuth

// todo ambil token.image -> masukkan ke session (OAuth)
// todo authConfig kau BESOK KONDISIKAN !!
// TODO PENGAMBILAN COOKIES VALUE KAU !!!
// TODO BERSIHKAN SEMUA AUTHENTICATION KAU !!! PASTIKAN FIX BARU LANJUT MIDDLEWARE !!!!

// todo kembalikan error dari server ke CLIENT besok !!
// todo JUST LITTLE BIT MORE !!

// Field	Isi	Tujuan
// token.sub	OAuth Provider ID	Identitas eksternal
// token.id	UUID DB	Relasi internal
// publicId	nanoid	URL publik
// email	user email	login
