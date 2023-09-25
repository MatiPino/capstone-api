import { Schema } from "mongoose"
import { Document } from 'mongoose'
export class Proveedor {}


export const  ProveedorSchema = new Schema({
    nombre: { type: String, required: true },
    telefono: String,
    correo: { type: String, required: true},
    direccion: { type: String, required: true}

})