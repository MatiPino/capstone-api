
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './Schema/usuario.schema';

@Injectable()
export class UsuarioService {
   async createUsuario(createUsuarioDTO: CreateUsuarioDto): Promise<Usuario>{
      const usuario = new this.usuarioModel(createUsuarioDTO);
      return await usuario.save()
   }
 constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>) {}

 async getUsuarios(): Promise<Usuario[]> {
    const usuario = await this.usuarioModel.find();
    return usuario;
 }

 async getUsuario(usuarioID: number): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(usuarioID);
    return usuario;
 }

  async create(createUsuarioDto: Promise<Usuario>) {
    const usuario = new this.usuarioModel(CreateUsuarioDto);
    return await usuario.save();
     
  }
  async updateUsuario(usuarioID: string, createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    console.log({ usuarioID, createUsuarioDto })
    try {
      const updatedUsuario = await this.usuarioModel.findByIdAndUpdate(usuarioID,createUsuarioDto, { new: true });

      if (!updatedUsuario) {
        return {
          success: false,
          data: []
        }
      }
      const res = {
        success: true,
        data: updatedUsuario
      }
      console.log(res)
      return res
    } catch (error) {
      return {
        success: false,
        data: error.message
      }
    }
  }
  async deleteUsuario(usuarioID: number): Promise<Usuario> {
    const deletedUsuario = await this.usuarioModel.findByIdAndDelete(usuarioID);
   return  deletedUsuario;
  }
}
