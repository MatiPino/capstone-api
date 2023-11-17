import { Document } from "mongoose";

export interface Chat extends Document {
    nombreEmisor: string;
    emisorID: string;
    receptorID: string;
    mensaje: string;
    createdAt: Date;
}