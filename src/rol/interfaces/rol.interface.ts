import { Document } from "mongoose";

export interface Rol extends Document {
  _id: string;
  readonly rol: string;
  usuarios: Array<any>;
}
