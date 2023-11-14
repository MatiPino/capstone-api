import { Injectable } from "@nestjs/common";
import { CreateProveedorDto } from "./dto/create-proveedor.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Proveedor } from "./interfaces/proveedor.interface";
import { Usuario } from "../usuario/interfaces/usuario.interface";

@Injectable()
export class ProveedorService {
  constructor(
    @InjectModel("Proveedor") private readonly proveedorModel: Model<Proveedor>,
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>
    ) {}

    async crear(CreateProveedorDto: CreateProveedorDto) {
      const { nombre, telefono, descripcion, correo, clienteId } = CreateProveedorDto;
      try {
        const proveedor = new this.proveedorModel({
          nombre,
          telefono,
          descripcion,
          correo,
          clienteId
        });
  
        const data = await proveedor.save();
        await this.usuarioModel.findByIdAndUpdate(clienteId, {
          proveedor: data._id
        })
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

  async traerProveedoresID(id: string) {
    try {
      const proveedor = await this.proveedorModel.find({clienteId: id});
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

  async update(id: string, updateProveedorDto: CreateProveedorDto) {
    try {     
    } catch (error) {}
  }

  async remove (id: string) {
    try {
      const proveedor = await this.proveedorModel.findByIdAndDelete(id);
      console.log(proveedor);
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
}
