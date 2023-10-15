import { Schema } from "mongoose";

export const ComercioSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  propietario: { type: Schema.ObjectId, ref: "Usuario", required: true },
  productos: [{ type: Schema.ObjectId, ref: "Producto", required: false }],
  registros: [{ type: Schema.ObjectId, ref: "Registro", required: false }],
});
