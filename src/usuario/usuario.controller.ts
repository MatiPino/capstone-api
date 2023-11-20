// Import necessary modules
import { Controller, Get, Post, Param, Body, Patch, Delete, Res, HttpStatus, Put, Query, NotFoundException, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("usuario")
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() body: any) {
    return this.usuarioService.crear(body);
  }
  @Post("usuario")
  createUsuario(@Body() body: any) {
    return this.usuarioService.crearUsuario(body);
  }

  // Define findAll route with @Get()
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usuarioService.getUsuario(id);
  }

  @Get("img/:rut")
  buscarImagen(@Param("rut") rut: string) {
    return this.usuarioService.buscarImagen(rut);
  }

  @Put()
  updateUsuario(@Body() createUsuarioDTO: CreateUsuarioDto) {
    return this.usuarioService.updateUsuario(createUsuarioDTO);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.usuarioService.remove(id);
  }
}
