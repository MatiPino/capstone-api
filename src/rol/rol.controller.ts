import { Controller,Res, Get, Post, Body, Patch, Param, Delete,HttpStatus, NotFoundException } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Response } from 'express';
import mongoose from 'mongoose';
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('/create')
  async createPost(@Res() res: Response, @Body() createRolDto: CreateRolDto){
     // Create new Rol and return response
     const rol = await this.rolService.createRol(createRolDto);
     return res.status(HttpStatus.OK).json({
       message: 'Rol Creado',
       rol
     });
  }
  @Get()
  findAll() {
    // Return all roles
    return this.rolService.getRoles();
 }

  @Get('/:rolID')
   getRol(@Res() resizeBy, @Param('rolID') rolID){
    const rol =  this.rolService.getRol(rolID)
     return resizeBy.status(HttpStatus.OK).json(rol);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(+id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(+id);
  }
}
