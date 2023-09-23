import { Schema } from 'mongoose'

export class Registro {}


export const  RegistroSchema = new Schema({
    registro_id: Number,
    productos: { type: String, required: true },
    total: { type: Number, required: true},
    type: { type: Boolean, required: true},
    date: Date

})