import { Document } from "mongoose";

export class Autenticacion extends Document {
  readonly rut: string;
  readonly contrasena: string;
  usuario: any;
}
