import { Injectable } from "@nestjs/common";
import { CreateProveedorDto } from "./dto/create-proveedor.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Proveedor } from "./interfaces/proveedor.interface";
@Injectable()
export class ProveedorService {
  constructor(
    @InjectModel("Proveedor") private readonly proveedorModel: Model<Proveedor>
    ) {}

  async findAll() {
    try {
      const proveedor = await this.proveedorModel.find();
      return {
        success: true,
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async crear(CreateProveedorDto: CreateProveedorDto) {
    const { nombre, telefono, descripcion, correo } = CreateProveedorDto;
    try {
      const proveedor = new this.proveedorModel({
        nombre,
        telefono,
        descripcion,
        correo,
      });
      const data = await proveedor.save();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async update(id: string, updateProveedorDto: CreateProveedorDto) {
    try {     
    } catch (error) {}
  }

  remove (id: string) {
    return `This action removes a #${id} proveedor`;
  }
}
