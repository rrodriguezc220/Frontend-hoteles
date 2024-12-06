// src/app/api/auth/[...nextauth]/route.js

import { postLogin } from "@/services/access";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Definir authOptions
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "email", placeholder: "ejemplo@mail" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const response = await postLogin(credentials?.username, credentials?.password);

                if (response && response.token) {
                    return {
                        email: credentials.username,
                        token: response.token,
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/acceso/login",
        signOut: "/",
    }
};

// Crear el manejador de NextAuth
const handler = NextAuth(authOptions);

// Exportar los métodos para el API (GET y POST)
export { handler as GET, handler as POST };