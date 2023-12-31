import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from "@nestjs/common";
import { ComercioService } from "./comercio.service";
import { CreateComercioDto } from "./dto/create-comercio.dto";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("comercio")
@UseGuards(JwtAuthGuard)
export class ComercioController {
  constructor(private readonly comercioService: ComercioService) {}

  @Post()
  create(@Body() createComercioDto: CreateComercioDto) {
    return this.comercioService.create(createComercioDto);
  }

  @Get()
  findAll() {
    return this.comercioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.comercioService.findOne(id);
  }
  @Get("registros/:id")
  findComercio(@Param("id") id: string) {
    return this.comercioService.findComercio(id);
  }

  @Get("productos/:id")
  findProductos(@Param("id") id: string) {
    return this.comercioService.findProductos(id);
  }

  @Delete(":id")
    remove(@Param("id") id: string) {
        return this.comercioService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateComercioDto: CreateComercioDto) {
        return this.comercioService.updateComercio(id, updateComercioDto);
    }
}
