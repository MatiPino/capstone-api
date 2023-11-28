import { Schema } from "mongoose";

export const PublicacionSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: String, required: true },
  codigo_barra: { type: String, required: true },
  categoria: { type: String, required: true },
  imagen: { type: String, required: false },
  proveedor: { type: Schema.Types.ObjectId, required: true, ref: "Usuario" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
