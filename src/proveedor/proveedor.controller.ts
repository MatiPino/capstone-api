import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Response } from 'express';
@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

 // Define createPost route with @Post('/create')
 @Post('/create')
 async createPost(@Res() res: Response, @Body() createProveedorDto: CreateProveedorDto){
    // Create new proveedor and return response
    const proveedor = await this.proveedorService.createProveedor(createProveedorDto);
    return res.status(HttpStatus.OK).json({
      message: 'Proveedor creado',
      usuario: proveedor
    });
 }

 // Define findAll route with @Get()
 @Get()
 findAll() {
    // Return all proveedores
    return this.proveedorService.getProveedores();
 }

 // Define findOne route with @Get(':id')
 @Get(':id')
 findOne(@Param('id') id: string) {
    // Return proveedor with specified id
    return this.proveedorService.getProveedor(+id);
 }

 // Define update route with @Patch(':id')
 @Patch(':id')
 update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    // Update proveedor with specified id and return updated proveedor
    return this.proveedorService.update(+id, updateProveedorDto);
 }

 // Define remove route with @Delete(':id')
 @Delete(':id')
 remove(@Param('id') id: string) {}
};