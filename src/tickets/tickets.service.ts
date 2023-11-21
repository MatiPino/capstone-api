import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';
import { Ticket } from './interface/tickets.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TicketsService {
  constructor (
    @InjectModel('Ticket') private readonly ticketModel: Model<Ticket>,
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>
  ) {}

  async crear(createTicketDto: CreateTicketDto) {
    const { ticketsID, asunto, descripcion, estado, usuarioID, adminID, archivo } = createTicketDto;
  
    if (!Types.ObjectId.isValid(usuarioID)) {
      throw new BadRequestException('Favor de ingresar un ID válido');
    }
  
    const usuario = await this.usuarioModel.findById(usuarioID)
  
    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }
  
    try {
      const ticket = new this.ticketModel({
        ticketsID,
        asunto,
        descripcion,
        estado,
        usuarioID,
        adminID,
        archivo,
      });
      await ticket.save();
      
      return {
        estado: 'Ticket creado exitosamente',
        data: ticket,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Error al crear el ticket");
    }
    
  }

  async traerTodos() {
    try {
      const data = await this.ticketModel.find();
      
      if (data.length === 0) {
        throw new BadRequestException("No hay tickets");
      }
  
      return {
        estado: 'Tickets encontrados',
        data,
      };
    } catch (error) {
      throw new BadRequestException("Error al buscar los tickets");
    }
  }

  async traerPorUsuario(usuarioID: string) {
    try {
      const data = await this.ticketModel.find({ usuarioID });
      
      if (data.length === 0) {
        throw new BadRequestException("No hay tickets");
      }
  
      return {
        estado: 'Tickets encontrados',
        data,
      };
    } catch (error) {
      throw new BadRequestException("Error al buscar los tickets");
    }
  }

}
