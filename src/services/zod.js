import { object, string } from "zod";

export const loginSchema = object({
    username: string({required_error: "El nombre de usuario es requerido"})
    .email({message: "El nombre de usuario debe ser un email"}),
    password: string({required_error: "La contraseña es requerida"})
});