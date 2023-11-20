import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
}
