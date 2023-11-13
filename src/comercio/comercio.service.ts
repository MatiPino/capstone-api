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
    const { direccion, nombre, propietario, telefono } = createComercioDto;
    try {
      const comercio = new this.comercioModel({
        direccion,
        nombre,
        propietario,
        telefono,
      });

      const data = await comercio.save();
      const usuario = await this.usuarioModel
        .findByIdAndUpdate(propietario, {
          comercio: comercio._id,
        })
        .exec();

      console.log({ data, usuario });
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

  update(id: number, updateComercioDto: UpdateComercioDto) {
    return `This action updates a #${id} comercio`;
  }

  remove(id: number) {
    return `This action removes a #${id} comercio`;
  }
}
