import { Controller, Res, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, UseGuards } from "@nestjs/common";
import { RolService } from "./rol.service";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { JwtAuthGuard } from "src/autenticacion/guards/auth.guard";
import { Rol } from "src/.decorators/roles.decorator";
import { Rol as RolEnum } from "src/.enums/rol.enum";
import RolGuard from "src/guards/rol.guard";

@Controller("rol")
@UseGuards(JwtAuthGuard, RolGuard)
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  createPost(@Body() createRolDto: CreateRolDto) {
    return this.rolService.createRol(createRolDto);
  }

  @Get()
  @Rol(RolEnum.ADMIN, RolEnum.CLIENTE)
  findAll() {
    return this.rolService.findAll();
  }

  @Get("gestion")
  @Rol(RolEnum.ADMIN)
  findGestion() {
    return this.rolService.todosUsuarios();
  }


  @Get(":id")
  findOne(@Param("id") rol: string) {
    return this.rolService.todosRol(rol);
  }

  @Get(":rol")
  @Rol(RolEnum.ADMIN)
  findUsuarios(@Param("rol") rol: string) {
    return this.rolService.todosRol(rol);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(+id, updateRolDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolService.remove(+id);
  }
}
