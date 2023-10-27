import { Controller, Res, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException } from "@nestjs/common";
import { RolService } from "./rol.service";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";

@Controller("rol")
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  createPost(@Body() createRolDto: CreateRolDto) {
    return this.rolService.createRol(createRolDto);
  }
  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") rol: string) {
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
