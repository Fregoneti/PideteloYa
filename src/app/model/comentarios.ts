import { cuenta } from "./cuenta";
import { Lugar } from "./lugar";

export interface comentarios{
    cuenta?:cuenta;
    lugar?:Lugar;
    name?:string;
    description:string,
}