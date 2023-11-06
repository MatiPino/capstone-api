import { Document } from "mongoose";
export interface Registro extends Document {
  readonly productos: Array<any>;
  readonly total: number;
  readonly tipo: boolean;
  readonly comercio: string;
  readonly createdAt: Date;
}
