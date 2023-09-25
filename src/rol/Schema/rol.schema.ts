import { Schema } from "mongoose"
import { Document } from "mongoose"
import { CreateRolDto } from "../dto/create-rol.dto"
import { Mongoose } from "mongoose"
export class Rol {
    static findByIdAndUpdate(rolID: any, createRolDTO: CreateRolDto, arg2: { new: boolean }) {
        throw new Error('Method not implemented.')
     }
}

export const  RolSchema = new Schema({
    rol: { type: String, required: true },

})