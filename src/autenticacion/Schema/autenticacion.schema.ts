import { Schema } from "mongoose";
export class Autenticacion {}


export const  AutenticacionSchema = new Schema({
    nombre: { type: String, required: true },
    contrasena:{ type: String, required: true},
    createdAt:{
      type: Date,
      default: Date.now
    }
})