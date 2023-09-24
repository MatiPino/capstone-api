import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Proveedor } from './Schema/proveedor.schema';
@Injectable()
export class ProveedorService {
   async createProveedor(createProveedorDTO: CreateProveedorDto): Promise<Proveedor>{
      const proveedor = new this.proveedorModel(createProveedorDTO);
      return await proveedor.save()
   } 
 constructor(@InjectModel('Proveedor') private readonly proveedorModel: Model<Proveedor>) {}

 async getProveedores(): Promise<Proveedor[]> {
    const proveedor = await this.proveedorModel.find();
    return proveedor;
 }

 async getProveedor(proveedorID: number): Promise<Proveedor> {
    const proveedor = await this.proveedorModel.findById(proveedorID);
    return proveedor;
 }

  async create(createProveedorDto: Promise<Proveedor>) {
    const proveedor = new this.proveedorModel(CreateProveedorDto);
    return await proveedor.save();
     
  }
  async updateProveedor(proveedorID: string, createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    console.log({ proveedorID, createProveedorDto })
    try {
      const updatedProveedor = await this.proveedorModel.findByIdAndUpdate(proveedorID,createProveedorDto, { new: true });

      if (!updatedProveedor) {
        return {
          success: false,
          data: []
        }
      }
      const res = {
        success: true,
        data: updatedProveedor
      }
      console.log(res)
      return res
    } catch (error) {
      return {
        success: false,
        data: error.message
      }
    }
  }

  async deleteProveedor(proveedor_id: number): Promise<Proveedor> {
    const deletedProveedor = await this.proveedorModel.findByIdAndDelete(proveedor_id);
   return  deletedProveedor;
  }
}
