import { Document } from "mongoose";

export interface Publicacion extends Document {
    nombre: string;
    precio: number;
    codigo_barra: string;
    categoria: string;
    imagen?: string;
    createdAt: Date;
}