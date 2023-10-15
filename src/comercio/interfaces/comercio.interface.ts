import { Document } from "mongoose";

export interface Comercio extends Document {
  nombre: string;
  direccion: string;
  telefono: string;
  propietario: any;
  comercio: string;
  productos: string[];
  registros: string[];
}
