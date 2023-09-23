import { Schema } from 'mongoose'

export class Usuario {}


export const  UsuarioSchema = new Schema({
    usuario_id: Number,
    nombre: { type: String, required: true },
    apellido: String,
    rol: { type: String, required: true},
    auth_id: Number

})