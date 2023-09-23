import { Schema } from "mongoose"

export class Producto {}

export const  ProductoSchema = new Schema({
    producto_id: Number,
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    codigo_barra: { type: Number, required: true },
    proveedor_id: String

})