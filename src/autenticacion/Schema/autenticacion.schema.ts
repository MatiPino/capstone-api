import { Schema } from "mongoose";

export const AutenticacionSchema = new Schema({
  rut: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true, bcrypt: true },
  usuario: { type: Schema.ObjectId, ref: "Usuario" },
});

AutenticacionSchema.plugin(require("mongoose-bcrypt"));
