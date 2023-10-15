import { Document } from "mongoose";

export interface Proveedor extends Document {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  createdAt: Date;
}
