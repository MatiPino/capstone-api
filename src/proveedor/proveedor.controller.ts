import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, Query, Put } from "@nestjs/common";
import { ProveedorService } from "./proveedor.service";
import { CreateProveedorDto } from "./dto/create-proveedor.dto";

@Controller("proveedor")
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.crear(createProveedorDto);
  }

  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @Delete(":id")
  remove(@Body("id") id: string) {
    return this.proveedorService.remove(id);
  }
}
