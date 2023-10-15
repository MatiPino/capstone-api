import { Document } from "mongoose";

export interface Comercio extends Document {
  nombre: string;
  direccion: string;
  productos: string[];
  registros: string[];
}
