import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, Query, Put, UseGuards } from "@nestjs/common";
import { ProveedorService } from "./proveedor.service";
import { CreateProveedorDto } from "./dto/create-proveedor.dto";
import { UpdateProveedorDto } from "./dto/update-proveedor.dto";
import { Response } from "express";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("proveedor")
@UseGuards(JwtAuthGuard)
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post("/create")
  async createPost(@Res() res: Response, @Body() createProveedorDto: CreateProveedorDto) {
    // Create new proveedor and return response
    const proveedor = await this.proveedorService.createProveedor(createProveedorDto);
    return res.status(HttpStatus.OK).json({
      message: "Proveedor creado",
      usuario: proveedor,
    });
  }

  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get("/:proveedorID")
  async getProveedor(@Res() resizeBy, @Param("proveedorID") proveedorID) {
    const proveedor = await this.proveedorService.getProveedor(proveedorID);
    if (!proveedor) throw new NotFoundException(" Proveedor no encontrado o inexistente");
    return resizeBy.status(HttpStatus.OK).json(proveedor);
  }

  @Put(":productoID")
  updateProducto(@Body() createProveedorDTO: CreateProveedorDto, @Param("proveedorID") proveedorID) {
    return this.proveedorService.updateProveedor(proveedorID, createProveedorDTO);
  }

  @Delete("/delete")
  async deleteProveedor(@Res() res, @Query("proveedorID") proveedorID) {
    const proveedorDeleted = await this.proveedorService.deleteProveedor(proveedorID);
    if (!proveedorDeleted) throw new NotFoundException("Producto no existe");
    return res.status(HttpStatus.OK).json({
      message: "Proveedor eliminado exitosamente",
      proveedorDeleted,
    });
  }
}
