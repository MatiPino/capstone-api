import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { UpdateComercioDto } from './dto/update-comercio.dto';

@Controller('comercio')
export class ComercioController {
  constructor(private readonly comercioService: ComercioService) {}

  @Post()
  create(@Body() createComercioDto: CreateComercioDto) {
    return this.comercioService.create(createComercioDto);
  }

  @Get()
  findAll() {
    return this.comercioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comercioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComercioDto: UpdateComercioDto) {
    return this.comercioService.update(+id, updateComercioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comercioService.remove(+id);
  }
}
