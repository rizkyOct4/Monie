import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      publicId: string;
      name: string;
      email?: string;
      image?: string;
      role?: string;
    };
  }

  interface User {
    publicId: string;
    name: string;
    email?: string;
    image?: string;
    role?: string;
  }

  interface Token {
    publicId: string;
    name: string;
    email: string;
    image?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    publicId: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
  }
}
