import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  crear(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.crear(createTicketDto);
  }

  @Get(":estado")
  traerTodos(@Param('estado') estado: string) {
    const estadoBoolean = estado === 'true';
    return this.ticketsService.traerTodos(estadoBoolean);
  }

  @Get(':id')
  traerPorUsuario(@Param('id') id: string) {
    return this.ticketsService.traerPorUsuario(id);
  }

  @Get(':id/:estado')
  traerEstado(@Param('id') id: string , @Param('estado') estado: string) {
    const estadoBoolean = estado === 'true';
    return this.ticketsService.traerEstado(id, estadoBoolean);
  }
  
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.actualizarEstado(id, createTicketDto);
  }

  @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ticketsService.remove(id);
    }

}
