import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { postLogin } from "./services/access";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            authorize: async (credentials) => {
                let user = null;

                const response = await postLogin(credentials?.email, credentials?.password);

                user = {
                    email: credentials.email,
                    token: response.token,
                    role: "ADMIN",
                };

                if (!user.token) {
                    // No user found
                    throw new Error("Invalid credentials.");
                }

                // return user object with their profile data
                return user;
            },
        }),
    ],
    callbacks: {
        // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
        // Aqui se puede agregar o actualizar datos adicionales al token
        jwt({ user, token }) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
                token.exp = Math.floor(Date.now() / 1000) + (24 * 60); // 24 minutos
            }
            return token;
        },
        // session() se utiliza para agregar la información del token a la sesión.
        // lo que hace que esté disponible en el cliente
        session({ session, token }) {
            session.user.token = token.accessToken;
            session.user.role = token.role;
            session.expires = new Date(Date.now() + 24 * 60 * 1000).toISOString();
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
    jwt: {
        maxAge: 24 * 60, // 24 min
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60, // 24 min
        updateAge: 0,
    },
    pages: {
        signIn: "/acceso/login",
        signOut: "/",
    },
});