import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Producto } from "./interfaces/producto.interface";
import { Comercio } from "src/comercio/interfaces/comercio.interface";

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel("Producto") private readonly productoModel: Model<Producto>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>
  ) {}

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
  async findAllByComercio(id: string) {
    try {
      const producto = await this.productoModel.find({ comercio: id }).populate("comercio", "nombre _id").exec();
      console.log(producto);
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

  async create(createProductoDTO: CreateProductoDto) {
    const { codigo_barra, comercio, nombre, precio, proveedor, imagenes } = createProductoDTO;
    try {
      const producto = new this.productoModel({
        codigo_barra,
        comercio,
        nombre,
        precio,
        imagenes,
      });
      const data = await producto.save();
      await this.comercioModel.findByIdAndUpdate(comercio, { $push: { productos: data._id } });
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

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    try {
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacion`;
  }
}
