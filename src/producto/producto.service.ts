import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Producto } from "./interfaces/producto.interface";

@Injectable()
export class ProductoService {
  constructor(@InjectModel("Producto") private readonly productoModel: Model<Producto>) {}

  async findAll() {
    try {
      const producto = await this.productoModel.find();
      return {
        success: true,
        data: producto,
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
      const autenticacion = await this.productoModel.findById(id);
      return {
        success: true,
        data: autenticacion,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async createProducto(createProductoDTO: CreateProductoDto): Promise<Producto> {
    const producto = new this.productoModel(createProductoDTO);
    return await producto.save();
  }

  async updateProducto(productoID: string, createProductoDto: CreateProductoDto) {
    console.log({ productoID, createProductoDto });
    try {
      const updatedProducto = await this.productoModel.findByIdAndUpdate(productoID, createProductoDto, { new: true });

      if (!updatedProducto) {
        return {
          success: false,
          data: [],
        };
      }
      const res = {
        success: true,
        data: updatedProducto,
      };
      console.log(res);
      return res;
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacion`;
  }
}
