import { Schema } from 'mongoose'
import { Document } from 'mongoose'
export class Registro {}


export const  RegistroSchema = new Schema({
    productos: String,
    total: { type: Number, required: true},
    type:  Boolean,
    date: Date

})