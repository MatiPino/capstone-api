import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rol: { type: String, required: true, ref: "Rol" },
  imagen: { type: String, required: true },
  correo: { type: String, required: true },
  autentificacion: { type: Schema.ObjectId, ref: "Autenticacion" },
  date_added: { type: Date, default: Date.now },
});
