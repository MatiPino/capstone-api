import { Injectable } from '@nestjs/common';
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
      return {
        succeess: false,
        estado: 'Error al crear el ticket',
        data: 'UsuarioID no válido',
      }
    }
  
    const usuario = await this.usuarioModel.findById(usuarioID)
  
    if (!usuario) {
      return {
        succeess: false,
        estado: 'Error al crear el ticket',
        data: 'Usuario no encontrado',
      }
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
        succeess: true,
        estado: 'Ticket creado exitosamente',
        data: ticket,
      };
    } catch (error) {
      console.log(error);
      return {
        succeess: false,
        estado: 'Error al crear el ticket',
        data: error.message,
      }
    }
    
  }

  async traerTodos(estado: boolean) {
    try {
      const data = await this.ticketModel.find({estado});
      
      if (data.length === 0) {
        return {
          estado: 'No hay tickets',
          data: [],
        }
      }
  
      return {
        success: true,
        estado: 'Tickets encontrados',
        data,
      };
    } catch (error) {
      return {
        success: false,
        estado: 'Error al buscar los tickets',
        data: error.message,
      }
    }
  }

  async traerEstado(usuarioID: string, estado: boolean) {
    try {
      const data = await this.ticketModel.find({ usuarioID, estado });
  
      if (data.length === 0) {
        return {
          estado: 'No hay tickets',
          data: [],
        }
      }
  
      return {
        success: true,
        estado: 'Tickets encontrados',
        data,
      };
    } catch (error) {
      return {
        success: false,
        estado: 'Error al buscar los tickets',
        data: error.message,
      }
    }
  }

  async traerPorUsuario(usuarioID: string) {
    try {
      const data = await this.ticketModel.find({ usuarioID });
      
      if (data.length === 0) {
        return {
          success: false,
          estado: 'No hay tickets',
          data: [],
        }
      }
  
      return {
        success: true,
        estado: 'Tickets encontrados',
        data,
      };
    } catch (error) {
      return {
        success: false,
        estado: 'Error al buscar los tickets',
        data: error.message,
      }
    }
  }

  async actualizarEstado(id: string, CreateTicketDto: CreateTicketDto) {
    try {
      const updateTicketEstado = await this.ticketModel.findByIdAndUpdate(id, { ...CreateTicketDto }, { new: true });
      if (!updateTicketEstado) {
        return {
          estado: "No se encontró el ticket",
          data: [],
        };
      }
      const res = {
        success: true,
        estado: 'Estado actualizado',
        data: updateTicketEstado,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: 'Error al actualizar el estado del ticket',
        data: error.message,
      }
    }
  }

  async remove(id: string) {
    try {
      const ticket = await this.ticketModel.findByIdAndDelete(id);
      if (!ticket) {
        return {
          success: false,
          estado: 'No se encontró el ticket',
          data: [],
        };
      }
      return {
        success: true,
        estado: 'Ticket eliminado',
        data: ticket,
      };
    } catch (error) {
      return {
        success: false,
        estado: 'Error al eliminar el ticket',
        data: error.message,
      }
    }
  }

}
