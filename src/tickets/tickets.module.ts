import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/usuario/Schema/usuario.schema';
import { TicketSchema } from './schema/tickets.schema';

@Module({
  imports: [MongooseModule.forFeature([
      { name: 'Ticket', schema: TicketSchema },
      { name: 'Usuario', schema: UsuarioSchema}
    ])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
