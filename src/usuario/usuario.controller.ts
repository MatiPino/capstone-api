// Import necessary modules
import { Controller, Get, Post, Param, Body, Patch, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

// Decorate class with @Controller('usuario')
@Controller('usuario')
export class UsuarioController {
 // Inject RegistroService into controller
 constructor(private readonly usuarioService: UsuarioService) {}

 // Define createPost route with @Post('/create')
 @Post('/create')
 async createPost(@Res() res: Response, @Body() createUsuarioDto: CreateUsuarioDto){
    // Create new usuario and return response
    const usuario = await this.usuarioService.createUsuario(createUsuarioDto);
    return res.status(HttpStatus.OK).json({
      message: 'Usuario creado',
      usuario: usuario
    });
 }

 // Define findAll route with @Get()
 @Get()
 findAll() {
    // Return all usuarios
    return this.usuarioService.getUsuarios();
 }

 // Define findOne route with @Get(':id')
 @Get(':id')
 findOne(@Param('id') id: string) {
    // Return usuario with specified id
    return this.usuarioService.getUsuario(+id);
 }

 // Define update route with @Patch(':id')
 @Patch(':id')
 update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    // Update usuario with specified id and return updated usuario
    return this.usuarioService.update(+id, updateUsuarioDto);
 }

 // Define remove route with @Delete(':id')
 @Delete(':id')
 remove(@Param('id') id: string) {}
};