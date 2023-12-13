import { Injectable } from "@nestjs/common";
import { CreateComercioDto } from "./dto/create-comercio.dto";
import { UpdateComercioDto } from "./dto/update-comercio.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Comercio } from "./interfaces/comercio.interface";
import { Model } from "mongoose";
import { Usuario } from "src/usuario/interfaces/usuario.interface";
@Injectable()
export class ComercioService {
  constructor(
    @InjectModel("Comercio") private comercioModel: Model<Comercio>,
    @InjectModel("Usuario") private usuarioModel: Model<Usuario>
  ) {}

  async create(createComercioDto: CreateComercioDto) {
    const { direccion, nombre, propietario, telefono }: any = createComercioDto;
    console.log(direccion, nombre, propietario, telefono);
    try {
      const comercio = new this.comercioModel({
        direccion,
        nombre,
        propietario: propietario.id,
        telefono,
      });

      const data = await comercio.save();
      const usuario = await this.usuarioModel
        .findByIdAndUpdate(propietario, {
          comercio: comercio._id,
        })
        .exec();

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: error,
      };
    }
  }

  async findAll() {
    try {
      const comercios = await this.comercioModel.find().exec();
      return {
        success: true,
        data: comercios,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.comercioModel.findById(id).exec();
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
  async findComercio(id: string) {
    try {
      const primerDia = new Date();
      primerDia.setDate(1);

      const ultimoDia = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

      const data = await this.comercioModel
        .findById(id)
        .populate({
          path: "registros",
          match: {
            createdAt: { $gte: primerDia, $lte: ultimoDia },
          },
        })
        .select("registros")
        .exec();

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

  async findProductos(id: string) {
    try {
      const data = await this.comercioModel.findById(id).populate("productos").select("productos");
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

  async updateComercio(id: string, CreateComercioDto: CreateComercioDto) {
    try {
      const updateComercio = await this.comercioModel.findByIdAndUpdate(id, { ...CreateComercioDto }, { new: true });
      if (!updateComercio) {
        return {
          estado: "No se encontro el comercio",
          data: [],
        };
      }
      const res = {
        success: true,
        estado: "Comercio actualizado exitosamente",
        data: updateComercio,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: "Error al actualizar el comercio",
        data: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const comercio = await this.comercioModel.findByIdAndDelete(id);
      return {
        success: true,
        estado: "Comercio eliminado exitosamente",
        data: comercio,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al eliminar el comercio",
        data: error.message,
      };
    }
  }
}
