import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Producto } from "./interfaces/producto.interface";
import { Comercio } from "src/comercio/interfaces/comercio.interface";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Payload } from "src/.interfaces/payload.interface";

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel("Producto") private readonly productoModel: Model<Producto>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    private jwtService: JwtService
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
  async findAllByComercio(req: Request) {
    try {
      const { authorization } = req.headers;
      const decodedToken = this.jwtService.decode(authorization.split(" ")[1]);
      if (typeof decodedToken === "string") {
        return {
          success: false,
          data: [],
        };
      }
      const { comercio }: any = decodedToken;
      console.log(comercio);
      const producto = await this.productoModel.find({ comercio: comercio }).populate("comercio", "nombre _id").exec();
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

  async findOneByComercio(codigo_barra: string, comercio: string) {
    console.log({ codigo_barra, comercio });
    try {
      const producto = await this.productoModel.findOne({ codigo_barra, comercio }).select("-imagenes");
      console.log({ producto });
      if (!producto) {
        return {
          success: false,
          data: [],
        };
      }
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
    console.log(typeof id);
    try {
      const producto = await this.productoModel.findOne({ codigo_barra: id });
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

  async crear(createProductoDTO: CreateProductoDto) {
    const { codigo_barra, comercio, nombre, precio, proveedor, imagenes } = createProductoDTO;
    try {
      const producto = new this.productoModel({
        nombre,
        precio,
        codigo_barra,
        comercio,
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

  async remove(id: string, comercio) {
    // async remove(id: string) {
    try {
      const data = await this.productoModel.findByIdAndDelete(id);
      if (!data) {
        return {
          success: false,
          data: "Producto no encontrado",
        };
      }
      const { productos } = await this.comercioModel.findOne({ _id: comercio }).select("productos");
      const productoEliminado = productos.filter((producto) => producto != id);
      const comercioEncontrado = await this.comercioModel.findByIdAndUpdate(comercio, { productos: productoEliminado });
      if (!comercioEncontrado) {
        return {
          success: false,
          data: [],
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
}
