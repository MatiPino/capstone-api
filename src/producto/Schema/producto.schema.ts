import { Schema } from "mongoose";

export const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true, default: 0 },
  imagenes: [{ type: String, required: false }],
  codigo_barra: { type: String, required: true },
  proveedor: { type: Schema.ObjectId, ref: "Proveedor", required: false },
  comercio: { type: Schema.ObjectId, ref: "Comercio", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
