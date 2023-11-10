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
    // default: function () {
    //   const currentDate = new Date();
    //   // Restar un mes a la fecha actual

    //   // currentDate.setMonth(currentDate.getMonth() - 8);
    //   // currentDate.setFullYear(currentDate.getFullYear() - 1);
    //   return currentDate;
    // },
  },
});
