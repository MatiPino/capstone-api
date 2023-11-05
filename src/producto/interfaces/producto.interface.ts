import { Document } from "mongoose";

export interface Producto extends Document {
  nombre: string;
  precio: number;
  cantidad: number;
  codigo_barra: string;
  proveedor?: string;
  imagenes?: string[];
  comercio: string;
  createdAt: Date;
}
