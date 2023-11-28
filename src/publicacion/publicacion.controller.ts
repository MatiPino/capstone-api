import { Body, Controller, Delete, Get, Post, Param, Put } from "@nestjs/common";
import { CreatePublicacionDto } from "./dto/create-publicacion.dto";
import { PublicacionService } from "./publicacion.service";

@Controller("publicacion")
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionService.crear(createPublicacionDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePublicacionDto: CreatePublicacionDto) {
    return this.publicacionService.updatePublicacion(id, updatePublicacionDto);
  }
  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.publicacionService.findById(id);
  }
  @Get("filtro/:nombre/:categoria/:min/:max")
  filtro(@Param("nombre") nombre: string, @Param("categoria") categoria: string, @Param("min") min: number, @Param("max") max: number) {
    return this.publicacionService.filtro(nombre, categoria, min, max);
  }

  @Get("buscar/categorias")
  findAllCategorias() {
    return this.publicacionService.findAllCategorias();
  }

  @Get("categoria/:categoria")
  bucarPorCategorias(@Param("categoria") categoria: string) {
    return this.publicacionService.buscarPorCategoria(categoria);
  }

  @Delete(":id")
  remove(@Body("id") id: string) {
    return this.publicacionService.remove(id);
  }
}
