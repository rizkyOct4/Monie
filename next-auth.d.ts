import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      publicId: string;
      name: string;
      // role: string;
    };
  }

  interface User {
    id: string;
    publicId: string;
    name?: string | null;
    role: string;
  }

  interface Token {
    publicId: string;
    name: string;
    role: string;
  }
}
