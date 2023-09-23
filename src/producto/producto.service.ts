import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './Schema/producto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductoService {
   async createProducto(createProductoDTO: CreateProductoDto): Promise<Producto>{
      const producto = new this.productoModel(createProductoDTO);
      return await producto.save()
   } 
 constructor(@InjectModel('Producto') private readonly productoModel: Model<Producto>) {}

 async getProductos(): Promise<Producto[]> {
    const producto = await this.productoModel.find();
    return producto;
 }

 async getProducto(productoID: number): Promise<Producto> {
    const producto = await this.productoModel.findById(productoID);
    return producto;
 }

  async create(createProductoDto: Promise<Producto>) {
    const producto = new this.productoModel(CreateProductoDto);
    return await producto.save();
     
  }
  async update(producto_id: number, updateProductoDto: UpdateProductoDto): Promise <Producto> {
    const updatedProducto = await this.productoModel.findByIdAndUpdate(producto_id,
    CreateProductoDto, {new: true});
    return updatedProducto;
  }

  async deleteProducto(producto_id: number): Promise<Producto> {
    const deletedProducto = await this.productoModel.findByIdAndDelete(producto_id);
   return  deletedProducto;
  }
}
