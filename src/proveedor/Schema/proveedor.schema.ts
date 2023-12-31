import { Schema } from "mongoose";

export const ProveedorSchema = new Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  descripcion: { type: String, required: true },
  clienteId: { type: Schema.ObjectId, ref: "Usuario", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
