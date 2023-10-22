import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Req } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { Request } from "express";
@Controller("producto")
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto, @Req() req: Request) {
    console.log(req.headers);
    const { authorization } = req.headers;

    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }
  @Get("comercio/:id")
  findAllByComercio(@Param("id") id: string) {
    return this.productoService.findAllByComercio(id);
  }

  @Get(":id/:idComercio")
  findOneByComercio(@Param("id") id: string, @Param("idComercio") idComercio: string) {
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
