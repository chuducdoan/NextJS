import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  _id: string | number;
  username: string;
  email: String;
  isVerify: number | string;
  type: string;
  role: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
    access_token: string;
    refresh_token: string;
  }
}
