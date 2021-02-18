import { cuenta } from "./cuenta";
import { Lugar } from "./lugar";

export interface comentarios {
    email: cuenta;
    lugar?: Lugar;
    name?: string;
    description: string,
}