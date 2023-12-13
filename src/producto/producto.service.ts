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
import { WsLogicaService } from "src/ws-logica/ws-logica.service";

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel("Producto") private readonly productoModel: Model<Producto>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    private jwtService: JwtService // private readonly wsLogicaService: WsLogicaService
  ) {}

  async findAll() {
    try {
      const producto = await this.productoModel.find();
      return {
        success: true,
        estado: "Productos encontrados",
        data: producto,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los productos",
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
          estado: "Error al obtener los productos",
          data: [],
        };
      }
      const { comercio }: any = decodedToken;
      const producto = await this.productoModel.find({ comercio: comercio }).populate("comercio", "nombre _id").exec();
      return {
        success: true,
        estado: "Productos encontrados",
        data: producto,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los productos",
        data: error.message,
      };
    }
  }

  async findOneByComercio(codigo_barra: string, comercio: string) {
    try {
      const producto = await this.productoModel.findOne({ codigo_barra, comercio }).select("-imagenes");
      if (!producto) {
        return {
          success: false,
          estado: "Producto no encontrado",
          data: [],
        };
      }
      return {
        success: true,
        estado: "Producto encontrado",
        data: producto,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener el producto",
        data: error.message,
      };
    }
  }
  async findOne(id: string) {
    try {
      const producto = await this.productoModel.findOne({ codigo_barra: id });
      return {
        success: true,
        estado: "Producto encontrado",
        data: producto,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener el producto",
        data: error.message,
      };
    }
  }
  async findByCodigoBarra(codigoBarra: string) {
    try {
      const data = await this.productoModel.findOne({ codigo_barra: codigoBarra }).select("-imagenes");
      if (!data) {
        return {
          success: false,
          estado: "Producto no encontrado",
          data: [],
        };
      }
      return {
        success: true,
        estado: "Producto encontrado",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener el producto",
        data: error.message,
      };
    }
  }

  async create(createProductoDTO: CreateProductoDto) {
    console.log("ESTE NO ES");
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
        estado: "Producto creado exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear el producto",
        data: error.message,
      };
    }
  }

  async crear(createProductoDTO: CreateProductoDto) {
    const { codigo_barra, comercio, nombre, precio, cantidad, proveedor, imagenes } = createProductoDTO;
    try {
      const producto = new this.productoModel({
        nombre,
        precio,
        codigo_barra,
        comercio,
        imagenes,
        cantidad,
      });
      const data = await producto.save();
      await this.comercioModel.findByIdAndUpdate(comercio, { $push: { productos: data._id } });
      return {
        success: true,
        estado: "Producto creado exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear el producto",
        data: error.message,
      };
    }
  }

  async updateProducto(productoID: string, createProductoDto: CreateProductoDto) {
    console.log("CATEGORIA", createProductoDto.categoria);
    try {
      const producto = await this.productoModel.findById(productoID);
      if (!producto) {
        return {
          success: false,
          estado: "No se encontró el producto",
          data: [],
        };
      }
      const updatedProducto = await this.productoModel.findByIdAndUpdate(
        productoID,
        { categoria: createProductoDto.categoria, ...createProductoDto },
        { new: true }
      );
      if (!updatedProducto) {
        return {
          success: false,
          estado: "No se encontró el producto",
          data: [],
        };
      }
      const res = {
        success: true,
        estado: "Producto actualizado exitosamente",
        data: updatedProducto,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: "Error al actualizar el producto",
        data: error.message,
      };
    }
  }
  async actualizarStock(body: any) {
    console.log(this.actualizarStock);
    const { productos } = body;
    const res = {
      success: true,
      estado: "Error al actualizar el producto",
      data: [],
    };

    try {
      for (const { _id, cantidad } of productos) {
        const updatedProducto = await this.productoModel.findByIdAndUpdate(_id, { cantidad: cantidad }, { new: true });
        if (!updatedProducto) {
          return {
            success: false,
            estado: "No se encontró el producto",
            data: [],
          };
        }
        res.success = true;
        res.estado = "Producto actualizado exitosamente";
        res.data.push(updatedProducto);
      }

      return res;
    } catch (error) {
      return {
        success: false,
        estado: "Error al actualizar el producto",
        data: error.message,
      };
    }
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
          estado: "Comercio no encontrado",
          data: [],
        };
      }

      return {
        success: true,
        estado: "Producto eliminado exitosamente",
        data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al eliminar el producto",
        data: error.message,
      };
    }
  }
}
