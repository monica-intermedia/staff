import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  email: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password }: any = credentials;
        const payload = { email, password };

        try {
          const res = await fetch("http://localhost:8080/auth/loginkaryawan", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            const user: User = await res.json();
            return user;
          } else {
            console.log("email atau password salah");
            return null; // Handle kegagalan autentikasi
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Handle kegagalan autentikasi
        }
      },
    }),
  ],

  pages: {
    signIn: "/", // Redirect ke root URL untuk sign-in
  },

  callbacks: {
    jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user?.email) {
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.email) {
        session.user = { email: token.email };
      } else {
        session.user = {}; // Inisialisasi session.user jika undefined
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
