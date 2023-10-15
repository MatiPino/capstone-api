import { Schema } from "mongoose";

export const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  codigo_barra: { type: String, required: true },
  proveedor: { type: Schema.ObjectId, ref: "Proveedor", required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
