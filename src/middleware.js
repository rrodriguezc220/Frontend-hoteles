//export { default } from "next-auth/middleware";
export { auth as middleware } from "@/auth"

export const config = {
    matcher: [
        "/reservaciones/:path*",
        "/huespedes/:path*",
    ],
};