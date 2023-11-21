import { Document } from "mongoose";

export interface Ticket extends Document {
    ticketsID: string;
    asunto: string;
    descripcion: string;
    estado: boolean;
    usuarioID: string;
    adminID?: string;
    archivo?: string;
    createdAt: Date;
}