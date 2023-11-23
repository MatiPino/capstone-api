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
      throw new BadRequestException("Favor de ingresar los datos requeridos");
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
        estado: "Proveedor creado exitosamente",
        data: data,
      };
    } catch (error) {
      throw new BadRequestException("Error al crear el proveedor");
    }
  }

  async findAll() {
    try {
      const proveedor = await this.proveedorModel.find();
      return {
        estado: "Proveedores encontrados",
        data: proveedor,
      };
    } catch (error) {
      throw new BadRequestException("Error al encontrar los proveedores");
    }
  }

  async traerProveedoresID(id: string) {
    try {
      const proveedor = await this.proveedorModel.find({ clienteId: id });
      return {
        estado: "Tus proveedores encontrados",
        data: proveedor,
      };
    } catch (error) {
      throw new BadRequestException("Error al encontrar tus proveedores");
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
        estado: 'Proveedor actualizado exitosamente',
        data: updateProveedor,
      };
      return res;
    } catch (error) {
      throw new BadRequestException("Error al actualizar el proveedor");
    }
  }

  async remove(id: string) {
    try {
      const proveedor = await this.proveedorModel.findByIdAndDelete(id);
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
