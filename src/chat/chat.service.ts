import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
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
    const { emisorID, mensaje, enviadoPorEmisor, chatID } = createChatDto;
  
    if (!Types.ObjectId.isValid(emisorID)) {
      throw new BadRequestException('Favor de ingresar un ID válido');
    }
  
    const emisor = await this.usuarioModel.findById(emisorID)
  
    if (!emisor) {
      throw new BadRequestException('El usuario no existe');
    }
  
    try {
      let chat = await this.chatModel.findOne({ chatID });

      if (!chat) {
        chat = new this.chatModel({ chatID, mensajes: [] });
      }

      const mensajeConEmisor = { emisorID, mensaje, enviadoPorEmisor, createdAt: new Date() }; // REVISAR ESTO EN CASO DE ERROR
      chat.mensajes.push(mensajeConEmisor); // ORIGINALMENTE SE PASABA TODO EN EL PUSH
      await chat.save();
      
      return {
        estado: 'Mensaje creado exitosamente',
        data: chat,
      };
    } catch (error) {
      throw new BadRequestException("Error al enviar el mensaje");
    }
  }

  async buscarTodos(emisorID: string) {
    let query = {};
  
    if (emisorID) {
      query = { 'mensajes.emisorID': emisorID };
    }
  
    try {
      const data = await this.chatModel.find(query);
      
      if (data.length === 0) {
        if (emisorID) {
          throw new BadRequestException(`No se encontró ningún chat para el emisor con ID ${emisorID}`);
        } else {
          return { 
            estado: 'No hay chats' 
          };
        }
      }
  
      return {
        estado: 'Chats encontrados',
        data: data,
      };
    } catch (error) {
      throw new BadRequestException("Error al buscar los chats");
    }
  }

  async traerChatID(id: string) {
    const data = await this.chatModel.findOne({ chatID: id });
    
    if (!data) {
      throw new BadRequestException(`No se encontró ningún chat con el ID ${id}`);
    }

    try {
      return {
        estado: 'Chat encontrado',
        data: data,
      };
    } catch (error) {
      throw new BadRequestException("Error al buscar el chat");
    }
  }
}


  // async crear(createChatDto: CreateChatDto) {
  //   const { emisorID, mensaje, enviadoPorEmisor, chatID } = createChatDto;
  
  //   if (!Types.ObjectId.isValid(emisorID)) {
  //     throw new BadRequestException('Favor de ingresar un ID válido');
  //   }
  
  //   const emisor = await this.usuarioModel.findById(emisorID);
  
  //   if (!emisor) {
  //     throw new BadRequestException('El usuario no existe');
  //   }
  
  //   try {

  //     const chatExistente = await this.chatModel.findOne({ chatID });

  //     if (chatExistente) {
  //       await chatExistente.updateOne({ $push: { mensajes: { emisorID, mensaje, enviadoPorEmisor } } });
  //       return {
  //         estado: 'Mensaje agregado exitosamente',
  //         data: {mensaje},
  //       };
  //     } else {
  //       const chat = new this.chatModel({ chatID, mensajes: [{ emisorID, mensaje, enviadoPorEmisor }] });
  //       const data = await chat.save();
  //       return {
  //         estado: 'Chat creado exitosamente',
  //         data: data,
  //       };
  //     }
  //   } catch (error) {
  //     throw new BadRequestException("Error al enviar o actualizar el mensaje");
  //   }
  // }

  // async crear(createChatDto: CreateChatDto) {
  //   const { nombreEmisor ,emisorID, receptorID, mensaje } = createChatDto;
  
  //   if (!Types.ObjectId.isValid(emisorID) || !Types.ObjectId.isValid(receptorID)) {
  //     throw new BadRequestException('Favor de ingresar un ID válido');
  //   }
  
  //   const emisor = await this.usuarioModel.findById(emisorID);
  //   const receptor = await this.usuarioModel.findById(receptorID);
  
  //   if (!emisor || !receptor) {
  //     throw new BadRequestException('El usuario no existe');
  //   }
  
  //   try {
  //     const chat = new this.chatModel({ nombreEmisor, emisorID, receptorID, mensaje });
  //     const data = await chat.save();
  //     await emisor.updateOne({ $push: { chat: data.mensaje } });
  //     return {
  //       estado: 'Mensaje creado exitosamente',
  //       data: data,
  //     };;
  //   } catch (error) {
  //     throw new BadRequestException("Error al enviar el mensaje");
  //   }
  // }

  // async buscarTodos(emisorID: string) {
  //   let query = {};
  
  //   // Verificar si se proporciona el emisorID
  //   if (emisorID) {
  //     query = { emisorID, receptorID: emisorID };
  //   }
  
  //   try {
  //     const data = await this.chatModel.find(query).populate('emisorID receptorID');
  //     if (data.length === 0) {
  //       if (emisorID) {
  //         // Si se proporciona el emisorID pero no se encuentra el chat, lanzar una excepción
  //         throw new BadRequestException(`No se encontró ningún chat para el emisor con ID ${emisorID}`);
  //       } else {
  //         // Si no se proporciona el emisorID y no se encuentra ningún chat, devolver un mensaje indicando que no hay chats
  //         return { estado: 'No hay chats' };
  //       }
  //     }
  
  //     return {
  //       estado: 'Chats encontrados',
  //       data: data,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException("Error al buscar los chats");
  //   }
  // }

  // async traerChatID(id: string) {
  //   const data = await this.chatModel.find({ emisorID: id }).populate('emisorID receptorID');
  //   if (data.length === 0) {
  //     throw new BadRequestException('No hay chats');
  //   }
  //   try {
  //     return {
  //       estado: 'Chats encontrados',
  //       data: data,
  //     };;
  //   } catch (error) {
  //     throw new BadRequestException("Error al buscar los chats");
  //   }
  // }

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


  // async buscarTodos() {
  //   const data = await this.chatModel.find().populate('emisorID');
  //   if (data.length === 0) {
  //     throw new BadRequestException('No hay chats');
  //   }
  //   try {
  //     return {
  //       estado: 'Chats encontrados',
  //       data: data,
  //     };;
  //   } catch (error) {
  //     throw new BadRequestException("Error al buscar los chats");
  //   }
  // }
