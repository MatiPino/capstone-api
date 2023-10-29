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

  // Define findAll route with @Get()
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usuarioService.getUsuario(id);
  }

  @Get("img/:id")
  buscarImagen(@Param("id") id: string) {
    console.log(id);
    return this.usuarioService.buscarImagen(id);
  }

  @Put(":usuarioID")
  updateUsuario(@Body() createUsuarioDTO: CreateUsuarioDto, @Param("usuarioID") usuarioID) {
    return this.usuarioService.updateUsuario(usuarioID, createUsuarioDTO);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.usuarioService.remove(+id);
  }
}
