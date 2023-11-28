import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.crear(createChatDto);
  }

  @Get('buscarTodos/:emisorID')
  findAll(@Param('emisorID') emisorID: string) {
    return this.chatService.buscarTodos(emisorID);
  }

  @Get(':id')
  traerChatID(@Param('id') id: string) {
    return this.chatService.traerChatID(id);
  }

  
  @Put(':usuarioID/favorito')
  async marcarChatComoFavorito(@Param('usuarioID') chatID: string, @Body('favorito') favorito: boolean) {
    return this.chatService.marcarChatComoFavorito(chatID, favorito);
  }

  @Get()
  traerTodos() {
    return this.chatService.traerTodos();
  }

}
