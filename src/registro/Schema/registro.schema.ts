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
    default: function () {
      const currentDate = new Date();
      // Restar un mes a la fecha actual
      currentDate.setFullYear(currentDate.getFullYear() - 1);

      currentDate.setMonth(currentDate.getMonth() - 1);
      return currentDate;
    },
  },
});
