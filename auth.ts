import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import {
  OAuthRegister,
  CredentialsLogin,
} from "./_lib/services/auth/services-auth";
import type { User, Session } from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, // ? 0.5 hari -> login bertahan
    // updateAge: 60 * 60 * 12, // ? refreshh login
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "m@example.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const res = await CredentialsLogin({
          email: credentials.email,
          password: credentials.password,
        });

        const user: User = {
          id: String(res.user.publicId),
          publicId: res.user.publicId,
          name: res.user.name,
          // role: res.user.role,
        };

        return user;

        // ? CARI sama kau RETURN value dari credentials
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // debug: true, // This prints exact errors in the server logs
  // ? jwt -> INI DATA SECRET YG AKAN DIKIRIM KE COOKIES !!!
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // ! user -> credential, profile -> OAuth
      // ? credentials login → user berisi data dari authorize
      if (user) {
        token.publicId = user.publicId;
        token.name = user.name;
        // token.role = user.role;
      }

      // ? OAuth login → user hanya berisi data dasar
      if (account && profile) {
        const fullname = profile?.name ?? "";
        const splitName = fullname?.trim().split(" ");
        const firstName = splitName[0];
        const lastName = splitName.slice(1).join(" ");

        const email = profile.email ?? "";
        const profilePicture = profile.picture;

        const fetch = await OAuthRegister({
          firstName: firstName,
          lastName: lastName,
          email: email,
          fullname: fullname,
          imageUrl: profilePicture,
          createdAt: new Date(),
        });

        token.publicId = fetch[0].publicId;
        token.name = profile.name;
        // token.role = fetch[0].role;
      }

      // console.log(`token sesion`, token);
      return token;
    },
    // ? INI YG AKAN DIGUNAKNA DI CLIENT !!
    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user.publicId = token.publicId as string;
        session.user.name = token.name as string;
        // session.user.role = token.role as string;
      }
      return session;
    },
  },

  // ! TARGET COOKIES KAU !!! -> Ini yang memastikan user login tetap hidup, dan memastikan token tidak dicuri lewat JavaScript.
  // cookies: {
  //   sessionToken: {
  //     name: `next-auth.session-token`,
  //     options: {
  //       httpOnly: true, // ? cookie TIDAK bisa diakses JavaScript browser
  //       secure: process.env.NODE_ENV === "production", // ? `secure` harus true pada HTTPS
  //       path: "/", // ? semua route bisa membaca session
  //     },
  //   },
  // },
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
