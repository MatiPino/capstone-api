import { Schema } from "mongoose";

export const RolSchema = new Schema({
  rol: { type: String, required: true, unique: true },
  usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario", required: false }],
  date_added: { type: Date, default: Date.now },
});
