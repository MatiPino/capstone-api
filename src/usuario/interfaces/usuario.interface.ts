import { Document } from "mongoose";
export interface Usuario extends Document {
  readonly name: string;
  readonly apellido: string;
  readonly rol: string;
  autentificacion_id: string;
}
