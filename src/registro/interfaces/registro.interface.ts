import { Document } from "mongoose";
export interface Registro extends Document {
    readonly productos: string;
    readonly total: number;
    readonly tipo: boolean;
    readonly date: Date;
}