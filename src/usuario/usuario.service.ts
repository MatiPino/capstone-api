
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
  async update(usuario_id: number, updateUsuarioDto: UpdateUsuarioDto): Promise <Usuario> {
    const updatedUsuario = await this.usuarioModel.findByIdAndUpdate(usuario_id,
    CreateUsuarioDto, {new: true});
    return updatedUsuario;
  }

  async deleteUsuario(usuario_id: number): Promise<Usuario> {
    const deletedUsuario = await this.usuarioModel.findByIdAndDelete(usuario_id);
   return  deletedUsuario;
  }
}
