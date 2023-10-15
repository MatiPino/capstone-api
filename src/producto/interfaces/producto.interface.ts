import { Document } from "mongoose";

export interface Producto extends Document {
  nombre: string;
  precio: number;
  codigo_barra: string;
  proveedor?: string;
  createdAt: Date;
}
