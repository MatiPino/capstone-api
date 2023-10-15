import { Schema } from "mongoose";

export const ComercioSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  productos: [{ type: Schema.ObjectId, ref: "Producto", required: false }],
  registros: [{ type: Schema.ObjectId, ref: "Registro", required: false }],
});
