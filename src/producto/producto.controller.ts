import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, Query, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Response } from 'express';
import mongoose from 'mongoose';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post('/create')
  async createPost(@Res() res: Response, @Body() createProductoDto: CreateProductoDto){
     // Create new producto and return response
     const producto = await this.productoService.createProducto(createProductoDto);
     return res.status(HttpStatus.OK).json({
       message: 'Producto Añadido',
       producto
     });
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }
 
  
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productoService.findOne(id);
  }
 
  
  @Put(':productoID')
   updateProducto (@Body() createProductoDTO: CreateProductoDto, @Param('productoID') productoID){
     return this.productoService.updateProducto(productoID, createProductoDTO)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productoService.remove(+id);
  }

}