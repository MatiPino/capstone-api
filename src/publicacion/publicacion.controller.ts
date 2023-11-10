import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { PublicacionService } from './publicacion.service';

@Controller('publicacion')
export class PublicacionController {
    constructor(private readonly publicacionService: PublicacionService) {}
    
    @Post()
    create(@Body() createPublicacionDto: CreatePublicacionDto) {
        return this.publicacionService.crear(createPublicacionDto);
    }
    
    @Get()
    findAll() {
        return this.publicacionService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.publicacionService.findById(id);
    }

    @Delete(':id')
    remove(@Body('id') id: string) {
        return this.publicacionService.remove(id);
    }
}
