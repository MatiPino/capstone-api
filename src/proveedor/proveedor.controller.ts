import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, Query, Put } from "@nestjs/common";
import { ProveedorService } from "./proveedor.service";
import { CreateProveedorDto } from "./dto/create-proveedor.dto";

@Controller("proveedor")
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  crear(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.crear(createProveedorDto);
  }

  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.proveedorService.traerProveedoresID(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.proveedorService.remove(id);
  }
}
