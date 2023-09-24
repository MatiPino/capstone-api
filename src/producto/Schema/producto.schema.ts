import { Schema } from "mongoose"
import { Document } from 'mongoose'
import { CreateProductoDto } from "../dto/create-producto.dto"
export class Producto {
   static findByIdAndUpdate(productoID: any, createProductoDTO: CreateProductoDto, arg2: { new: boolean }) {
      throw new Error('Method not implemented.')
   }
}

export const  ProductoSchema = new Schema({
    producto_id: Number,
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    codigo_barra: { type: Number, required: true },
    proveedor_id: String

})