import { Schema } from "mongoose";

export const AutenticacionSchema = new Schema({
  rut: { type: String, required: true },
  contrasena:{ type: String, required: true, bcrypt: true},
  usuario_id: { type: Schema.ObjectId, ref: "Usuario" },
});
