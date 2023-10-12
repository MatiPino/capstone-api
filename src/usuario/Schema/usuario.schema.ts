import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: String,
  rol: { type: String, required: true },
  imagen: String,
  contrasena:{ type: String, required: true, bcrypt: true},
  autentificacion_id: { type: Schema.ObjectId, ref: "Autenticacion" },
  date_added: { type: Date, default: Date.now },
});
UsuarioSchema.plugin(require('mongoose-bcrypt'))