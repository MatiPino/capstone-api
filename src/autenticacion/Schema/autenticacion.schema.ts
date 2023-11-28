import { Schema, Document, model } from "mongoose";
import { UsuarioSchema } from "src/usuario/Schema/usuario.schema"; // Asegúrate de importar correctamente el modelo y el esquema de Usuario
import { Usuario } from "src/usuario/interfaces/usuario.interface";

export const AutenticacionSchema = new Schema({
  rut: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true, bcrypt: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

AutenticacionSchema.plugin(require("mongoose-bcrypt"));
