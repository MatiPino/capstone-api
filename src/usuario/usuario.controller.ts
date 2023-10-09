// Import necessary modules
import { Controller, Get, Post, Param, Body, Patch, Delete, Res, HttpStatus, Put, Query, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

// Decorate class with @Controller('usuario')
@Controller("usuario")
export class UsuarioController {
  // Inject RegistroService into controller
  constructor(private readonly usuarioService: UsuarioService) {}

  // Define createPost route with @Post('/create')
  @Post("/create")
  async createPost(@Res() res: Response, @Body() createUsuarioDto: CreateUsuarioDto) {
    // Create new usuario and return response
    const usuario = await this.usuarioService.createUsuario(createUsuarioDto);
    return res.status(HttpStatus.OK).json({
      message: "Usuario creado",
      usuario: usuario,
    });
  }
  @Post()
  create(@Body() createUsuarioDto: any) {
    // Create new usuario and return response
    return this.usuarioService.crear(createUsuarioDto);
  }

  // Define findAll route with @Get()
  @Get()
  findAll() {
    // Return all usuarios
    return this.usuarioService.getUsuarios();
  }

  // Define findOne route with @Get(':id')
  @Get(":id")
  findOne(@Param("id") id: string) {
    // Return usuario with specified id
    return this.usuarioService.getUsuario(+id);
  }

  // Define update route with @Patch(':id')
  @Put(":usuarioID")
  updateUsuario(@Body() createUsuarioDTO: CreateUsuarioDto, @Param("usuarioID") usuarioID) {
    return this.usuarioService.updateUsuario(usuarioID, createUsuarioDTO);
  }

  // Define remove route with @Delete(':id')
  @Delete("/delete")
  async deleteUsuario(@Res() res, @Query("usuarioID") usuarioID) {
    const usuarioDeleted = await this.usuarioService.deleteUsuario(usuarioID);
    if (!usuarioDeleted) throw new NotFoundException("Usuario no existe");
    return res.status(HttpStatus.OK).json({
      message: "Usuario eliminado exitosamente",
      usuarioDeleted,
    });
  }
}
