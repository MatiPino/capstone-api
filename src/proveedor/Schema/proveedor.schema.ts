import { Schema } from "mongoose"

export class Proveedor {}


export const  ProveedorSchema = new Schema({
    proveedor_id: Number,
    nombre: { type: String, required: true },
    telefono: String,
    correo: { type: String, required: true},
    direccion: { type: String, required: true}

})