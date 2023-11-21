import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    ticketsID: { type: String, required: true },
    asunto: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: Boolean, required: true },
    usuarioID: { type: Schema.ObjectId, ref: "Usuario", required: true },
    adminID: { type: Schema.ObjectId, ref: "Usuario", required: false },
    archivo: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});