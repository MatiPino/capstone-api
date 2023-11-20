import { Schema } from "mongoose";

// export const ChatSchema = new Schema({
//     nombreEmisor: { type: String, required: true },
//     emisorID: { type: String, required: true },
//     receptorID: { type: String, required: true },
//     mensaje: { type: String, required: true },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

export const ChatSchema = new Schema({
    chatID: { type: String, required: true, unique: true },
    mensajes: [
        {
            emisorID: { type: String, required: true },
            mensaje: { type: String, required: true },
            enviadoPorEmisor: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});