import { Schema } from "mongoose";
import { Document } from "mongoose";
export class Registro {}

export const RegistroSchema = new Schema({
  productos: [{ type: Object, required: true }],
  total: { type: Number, required: true },
  tipo: { type: Boolean, required: true },
  comercio: { type: Schema.ObjectId, ref: "Comercio", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
