import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './Schema/producto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Injectable()
export class ProductoService {
  constructor(@InjectModel('Producto') private readonly productoModel: Model<Producto>) { }

  async getProductos(): Promise<Producto[]> {
    const productos = await this.productoModel.find();
    return productos;
  }

  async getProducto(productoID: string): Promise<Producto> {
    const producto = await this.productoModel.findById(productoID);
    return producto;
  }

  async createProducto(createProductoDTO: CreateProductoDto): Promise<Producto> {
    const producto = new this.productoModel(createProductoDTO);
    return await producto.save()
  }

  async updateProducto(productoID: string, createProductoDto: CreateProductoDto): Promise<Producto> {
    console.log({ productoID, createProductoDto })
    try {
      const updatedProducto = await this.productoModel.findByIdAndUpdate(productoID,createProductoDto, { new: true });

      if (!updatedProducto) {
        return {
          success: false,
          data: []
        }
      }
      const res = {
        success: true,
        data: updatedProducto
      }
      console.log(res)
      return res
    } catch (error) {
      return {
        success: false,
        data: error.message
      }
    }
  }

  async deleteProducto(producto_id: number): Promise<Producto> {
    const deletedProducto = await this.productoModel.findByIdAndDelete(producto_id);
    return deletedProducto;
  }
}
