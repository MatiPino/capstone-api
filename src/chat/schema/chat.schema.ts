import { Schema } from "mongoose";

export const ChatSchema = new Schema({
    chatID: { type: String, required: true, unique: true },
    favorito: { type: Boolean, default: false },
    mensajes: [
        {
            emisorID: { type: String, required: true },
            mensaje: { type: String, required: true },
            enviadoPorEmisor: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});