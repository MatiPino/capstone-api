import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import { UpdateAutenticacionDto } from "./dto/update-autenticacion.dto";

@Controller("autenticacion")
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post()
  create(@Body() createAutenticacionDto: CreateAutenticacionDto) {
    return this.autenticacionService.create(createAutenticacionDto);
  }

  @Post("login")
  login(@Body() credenciales: CreateAutenticacionDto) {
    return this.autenticacionService.login(credenciales);
  }
  @Post("registrar")
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
  findAll() {
    return this.autenticacionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.autenticacionService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAutenticacionDto: UpdateAutenticacionDto) {
    return this.autenticacionService.update(+id, updateAutenticacionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.autenticacionService.remove(+id);
  }
}
