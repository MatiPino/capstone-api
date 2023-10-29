import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import { UpdateAutenticacionDto } from "./dto/update-autenticacion.dto";
import { JwtAuthGuard } from "./guards/auth.guard";

@Controller("autenticacion")
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAutenticacionDto: CreateAutenticacionDto) {
    return this.autenticacionService.create(createAutenticacionDto);
  }

  @Post("login") // NO poner useGuard a login, porque no tiene token para validar
  login(@Body() credenciales: CreateAutenticacionDto) {
    return this.autenticacionService.login(credenciales);
  }
  @Post("registrar")
  @UseGuards(JwtAuthGuard)
  registrar(@Body() body: any) {
    return this.autenticacionService.crear(body);
  }
  @Post("verificarToken")
  verificarToken(@Body() body: any) {
    const { token } = body;
    console.log(token);
    return this.autenticacionService.verificarToken(token);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.autenticacionService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.autenticacionService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateAutenticacionDto: UpdateAutenticacionDto) {
    return this.autenticacionService.update(+id, updateAutenticacionDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.autenticacionService.remove(+id);
  }
}
