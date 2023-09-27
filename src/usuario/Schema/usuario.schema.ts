import { Schema } from 'mongoose'
import { Document } from 'mongoose'
export class Usuario {}


export const  UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: String,
    rol: { type: String, required: true},
    contrasena:{ type: String, required: true},
    autentificacion_id: { type: Schema.ObjectId, ref: "autentificacion" }

})