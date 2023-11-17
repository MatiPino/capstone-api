import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './interface/chat.interface';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor (
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>
  ) {}

  async crear(createChatDto: CreateChatDto) {
    const { nombreEmisor ,emisorID, receptorID, mensaje } = createChatDto;
  
    if (!Types.ObjectId.isValid(emisorID) || !Types.ObjectId.isValid(receptorID)) {
      throw new BadRequestException('Favor de ingresar un ID válido');
    }
  
    const emisor = await this.usuarioModel.findById(emisorID);
    const receptor = await this.usuarioModel.findById(receptorID);
  
    if (!emisor || !receptor) {
      throw new BadRequestException('El usuario no existe');
    }
  
    try {
      const chat = new this.chatModel({ nombreEmisor, emisorID, receptorID, mensaje });
      const data = await chat.save();
      await emisor.updateOne({ $push: { chat: data.mensaje } });
      return {
        estado: 'Mensaje creado exitosamente',
        data: data,
      };;
    } catch (error) {
      throw new BadRequestException("Error al enviar el mensaje");
    }
  }


  // async crear(createChatDto: CreateChatDto) {
  //   const { nombreEmisor , emisorID, receptorID, mensaje } = createChatDto;
  
  //   if (!Types.ObjectId.isValid(emisorID) || !Types.ObjectId.isValid(receptorID)) {
  //     throw new BadRequestException('Favor de ingresar un ID válido');
  //   }
  
  //   const emisor = await this.usuarioModel.findById(emisorID);
  //   const receptor = await this.usuarioModel.findById(receptorID);
  
  //   if (!emisor || !receptor) {
  //     throw new BadRequestException('El usuario no existe');
  //   }
  
  //   try {

  //     const chatExistente = await this.chatModel.findOne({ emisorID, receptorID });

  //     if (chatExistente) {
  //       await chatExistente.updateOne({ $push: { mensaje } });
  //       console.log(chatExistente);
  //       return {
  //         estado: 'Mensaje agregado exitosamente',
  //         data: {mensaje},
  //       };
  //     } else {

  //       const chatInverso = await this.chatModel.findOne({ emisorID: receptorID, receptorID: emisorID });
        
  //       if (chatInverso) {
  //           await chatInverso.updateOne({ $push: { mensaje } });
  //           return {
  //             estado: 'Mensaje actualizado exitosamente en el chat inverso',
  //             data: { mensaje },
  //           };
  //         } else {

  //           const chat = new this.chatModel({ nombreEmisor, emisorID, receptorID, mensaje });
  //           const data = await chat.save();
  //           return {
  //           estado: 'Chat creado exitosamente',
  //           data: data,
  //         };;
  //       }
  //     }
  //   } catch (error) {
  //     throw new BadRequestException("Error al enviar o actualizar el mensaje");
  //   }
  // }


  async buscarTodos() {
    const data = await this.chatModel.find().populate('emisorID');
    if (data.length === 0) {
      throw new BadRequestException('No hay chats');
    }
    try {
      return {
        estado: 'Chats encontrados',
        data: data,
      };;
    } catch (error) {
      throw new BadRequestException("Error al buscar los chats");
    }
  }

  async traerChatID(id: string) {
    const data = await this.chatModel.find({ receptorID: id }).populate('emisorID receptorID');
    if (data.length === 0) {
      throw new BadRequestException('No hay chats');
    }
    try {
      return {
        estado: 'Chats encontrados',
        data: data,
      };;
    } catch (error) {
      throw new BadRequestException("Error al buscar los chats");
    }
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
