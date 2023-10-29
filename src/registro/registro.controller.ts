import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { RegistroService } from "./registro.service";
import { CreateRegistroDto } from "./dto/create-registro.dto";
import { UpdateRegistroDto } from "./dto/update-registro.dto";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("registro")
@UseGuards(JwtAuthGuard)
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post("/create")
  async createPost(@Res() res: Response, @Body() createRegistroDto: CreateRegistroDto) {
    // Create new registro and return response
    const registro = await this.registroService.createRegistro(createRegistroDto);
    return res.status(HttpStatus.OK).json({
      message: "Registro creado",
      registro: registro,
    });
  }

  // Define findAll route with @Get()
  @Get()
  findAll() {
    // Return all registros
    return this.registroService.getRegistros();
  }

  // Define findOne route with @Get(':id')
  @Get(":id")
  findOne(@Param("id") id: string) {
    // Return registro with specified id
    return this.registroService.getRegistro(+id);
  }

  // Define update route with @Patch(':id')
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    // Update registro with specified id and return updated registro
    return this.registroService.update(+id, updateRegistroDto);
  }

  // Define remove route with @Delete(':id')
  @Delete(":id")
  remove(@Param("id") id: string) {}
}
