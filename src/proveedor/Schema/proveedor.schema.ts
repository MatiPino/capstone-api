import { Schema } from "mongoose";

export const ProveedorSchema = new Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  direccion: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
