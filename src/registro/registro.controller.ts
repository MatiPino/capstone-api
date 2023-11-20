import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { RegistroService } from "./registro.service";
import { CreateRegistroDto } from "./dto/create-registro.dto";
import { UpdateRegistroDto } from "./dto/update-registro.dto";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("registro")
// @UseGuards(JwtAuthGuard)
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registroService.create(createRegistroDto);
  }

  // Define findAll route with @Get()
  @Get()
  findAll() {
    // Return all registros
    return this.registroService.getRegistros();
  }

  @Get("ultimosRegistros")
  ultimosRegistros() {
    return this.registroService.ultimosRegistros();
  }

  @Get("productosVendidosMes")
  getProductoVendidoMes() {
    return this.registroService.productoVendidoMes();
  }
  @Get("productosVendidosAnio")
  getProductoVendidoAnio() {
    return this.registroService.productoVendidoAnioConMes();
  }
  @Get("productosVendidosAnioPrueba")
  getProductoVendidoAnioPrueba() {
    return this.registroService.productoVendidoAnioPrueba();
  }
  @Get("compararRegistroAnio")
  getComRegistroAnio() {
    return this.registroService.compararRegistroPorAnio();
  }

  // Define update route with @Patch(':id')
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    // Update registro with specified id and return updated registro
    return this.registroService.update(+id, updateRegistroDto);
  }

  // Define remove route with @Delete(':id')
  @Delete(":id")
  remove(@Param("id") id: string) {
    return "sfsdf " + id;
  }
}
