import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Response } from 'express';

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
 
  // Define findAll route with @Get()
  @Get()
  findAll() {
     // Return all productos
     return this.productoService.getProductos();
  }
 
  
  @Get('/:productoID')
  async getProducto(@Res() resizeBy, @Param('productoID') productoID){
    const producto = await this.productoService.getProducto(productoID)
    if (!producto) throw new NotFoundException(' Producto no encontrado o inexistente');
     return resizeBy.status(HttpStatus.OK).json(producto);
  }
 
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
     // Update producto with specified id and return updated producto
     return this.productoService.update(+id, updateProductoDto);
  }
 
 
  @Delete('/delete')
  async deleteProducto(@Res() res, @Query ('productoID') productoID){
      const productoDeleted = await this.productoService.deleteProducto(productoID);
      if (!productoDeleted) throw new NotFoundException('Producto no existe')
        return res.status(HttpStatus.OK).json({
        message: 'Producto eliminado exitosamente',
        productoDeleted})
    }

}