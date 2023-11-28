import { Document } from "mongoose";

export interface Ticket extends Document {
    ticketsID: string;
    asunto: string;
    descripcion: string;
    estado: boolean;
    usuarioID: string;
    adminID?: string;
    respuesta?: string;
    archivo?: string;
    createdAt: Date;
}