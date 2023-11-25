import { Injectable, BadRequestException } from "@nestjs/common";
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

    if (!CreateProveedorDto) {
      return {
        estado: "Error al crear el proveedor",
        data: [],
      }
    }
    try {
      const proveedor = new this.proveedorModel({
        nombre,
        telefono,
        descripcion,
        correo,
        clienteId,
      });

      const data = await proveedor.save();
      await this.usuarioModel.findByIdAndUpdate(clienteId, {
        proveedor: data._id,
      });
      return {
        success: true,
        estado: "Proveedor creado exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear el proveedor",
        data: error.message,
      }
    }
  }

  async findAll() {
    try {
      const proveedor = await this.proveedorModel.find();
      return {
        success: true,
        estado: "Proveedores encontrados",
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al encontrar los proveedores",
        data: error.message,
      }
    }
  }

  async traerProveedoresID(id: string) {
    try {
      const proveedor = await this.proveedorModel.find({ clienteId: id });
      return {
        success: true,
        estado: "Tus proveedores encontrados",
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al encontrar tus proveedores",
        data: error.message,
      }
    }
  }

  async updateProveedor(id: string, CreateProveedorDto: CreateProveedorDto) {
    try {
      const updateProveedor = await this.proveedorModel.findByIdAndUpdate(id, { ...CreateProveedorDto }, { new: true });
      if (!updateProveedor) {
        return {
          estado: 'No se encontró el proveedor',
          data: [],
        };
      }
      const res = {
        success: true,
        estado: 'Proveedor actualizado exitosamente',
        data: updateProveedor,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: 'Error al actualizar el proveedor',
        data: error.message,
      }
    }
  }

  async remove(id: string) {
    try {
      const proveedor = await this.proveedorModel.findByIdAndDelete(id);
      return {
        success: true,
        estado: "Proveedor eliminado exitosamente",
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al eliminar el proveedor",
        data: error.message,
      };
    }
  }
}
