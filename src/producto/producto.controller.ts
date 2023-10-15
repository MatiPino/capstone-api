import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { CreateProductoDto } from "./dto/create-producto.dto";

@Controller("producto")
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
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

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productoService.findOne(id);
  }

  @Put(":productoID")
  updateProducto(@Body() createProductoDTO: CreateProductoDto, @Param("productoID") productoID) {
    return this.productoService.updateProducto(productoID, createProductoDTO);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productoService.remove(+id);
  }
}
