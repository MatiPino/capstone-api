// Import necessary modules
import { Controller, Get, Post, Param, Body, Patch, Delete, Res, HttpStatus, Put, Query, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("/create")
  async createPost(@Res() res: Response, @Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuarioService.createUsuario(createUsuarioDto);
    return res.status(HttpStatus.OK).json({
      message: "Usuario creado",
      usuario: usuario,
    });
  }
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
    return this.usuarioService.getUsuario(+id);
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
