import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { UsuarioSchema } from 'src/usuario/Schema/usuario.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Chat', schema: ChatSchema },
    { name: 'Usuario', schema: UsuarioSchema}
  ])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
