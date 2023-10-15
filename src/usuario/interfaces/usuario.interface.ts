import { Document } from "mongoose";
export interface Usuario extends Document {
  readonly nombre: String;
  readonly apellido: String;
  readonly rol: String;
  autentificacion?: any;
  comercio: any;
}
