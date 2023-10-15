import { Schema } from "mongoose";
import { Document } from "mongoose";
import { CreateRolDto } from "../dto/create-rol.dto";
import { Mongoose } from "mongoose";

export const RolSchema = new Schema({
  rol: { type: String, required: true, unique: true },
  usuarios: { type: Array<Schema.Types.ObjectId>, required: false },
  date_added: { type: Date, default: Date.now },
});
