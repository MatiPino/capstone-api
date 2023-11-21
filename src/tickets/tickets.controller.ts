import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  crear(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.crear(createTicketDto);
  }

  @Get()
  traerTodos() {
    return this.ticketsService.traerTodos();
  }

  @Get(':id')
  traerPorUsuario(@Param('id') id: string) {
    return this.ticketsService.traerPorUsuario(id);
  }
  

}
