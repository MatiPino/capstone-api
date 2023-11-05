import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Req, UseGuards } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "src/.interfaces/payload.interface";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";

@Controller("producto")
@UseGuards(JwtAuthGuard)
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService,
    private jwtService: JwtService
  ) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto, @Req() req: Request) {
    console.log(req.headers);
    const { authorization } = req.headers;

    return this.productoService.create(createProductoDto);
  }

  @Post("agregarProducto")
  crear(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.crear(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }
  @Get("comercio")
  findAllByComercio(@Req() req: Request) {
    return this.productoService.findAllByComercio(req);
  }

  @Get(":id/:idComercio")
  findOneByComercio(@Param("id") id: string, @Param("idComercio") idComercio: string) {
    console.log("hola");
    return this.productoService.findOneByComercio(id, idComercio);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productoService.findOne(id);
  }

  @Put(":productoID")
  updateProducto(@Body() createProductoDTO: CreateProductoDto, @Param("productoID") productoID) {
    return this.productoService.updateProducto(productoID, createProductoDTO);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductoDto: CreateProductoDto) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productoService.remove(+id);
  }
}
