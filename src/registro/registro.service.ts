import { Injectable } from "@nestjs/common";
import { CreateRegistroDto } from "./dto/create-registro.dto";
import { UpdateRegistroDto } from "./dto/update-registro.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Registro } from "./Schema/registro.schema";
import { Model } from "mongoose";
import { Comercio } from "src/comercio/interfaces/comercio.interface";
import { Producto } from "src/producto/interfaces/producto.interface";

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel("Registro") private readonly registroModel: Model<Registro>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    @InjectModel("Producto") private readonly productoModel: Model<Producto>
  ) {}

  async getRegistros(): Promise<Registro[]> {
    const registro = await this.registroModel.find();
    return registro;
  }

  async getRegistro(registroID: number): Promise<Registro> {
    const registro = await this.registroModel.findById(registroID);
    return registro;
  }

  async create(createRegistroDto) {
    try {
      console.log(createRegistroDto);
      const data = await this.registroModel.create(createRegistroDto);
      await this.comercioModel.findByIdAndUpdate(createRegistroDto.comercio, { $push: { registros: data._id } });
      for (const producto of createRegistroDto.productos) {
        const productoDb = await this.productoModel.findById(producto.id);
        productoDb.cantidad = productoDb.cantidad - producto.cantidad;
        productoDb.save();
      }
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
  async update(registro_id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    const updatedRegistro = await this.registroModel.findByIdAndUpdate(registro_id, CreateRegistroDto, { new: true });
    return updatedRegistro;
  }

  async deleteRegistro(registro_id: number): Promise<Registro> {
    const deletedRegistro = await this.registroModel.findByIdAndDelete(registro_id);
    return deletedRegistro;
  }
}
