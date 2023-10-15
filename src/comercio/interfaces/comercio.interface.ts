import { Document } from "mongoose";

export interface Comercio extends Document {
  nombre: string;
  direccion: string;
  telefono: string;
  propietario: any;
  productos: string[];
  registros: string[];
}
