import { Injectable } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Usuario } from "./interfaces/usuario.interface";
import { Autenticacion } from "src/autenticacion/interfaces/autenticacion.interface";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>
  ) {}

  async createUsuario(createUsuarioDTO: CreateUsuarioDto): Promise<Usuario> {
    const usuario = new this.usuarioModel(createUsuarioDTO);
    return await usuario.save();
  }

  async crear(createUsuarioDto: any) {
    try {
      const autenticacion = new this.autenticacionModel({ rut: createUsuarioDto.rut, contrasena: createUsuarioDto.contrasena });

      const usuario = new this.usuarioModel({
        nombre: createUsuarioDto.nombre,
        apellido: createUsuarioDto.apellido,
        rol: createUsuarioDto.rol,
        autentificacion_id: autenticacion._id,
      });
      autenticacion.usuario_id = usuario._id;
      usuario.autentificacion_id = autenticacion._id;

      await autenticacion.save();
      await usuario.save();

      console.log({ usuario, autenticacion });
      return {
        success: true,
        data: usuario,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async findAll() {
    try {
      const usuarios = await this.usuarioModel.find();
      return {
        success: true,
        data: usuarios,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getUsuario(usuarioID: number): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(usuarioID);
    return usuario;
  }

  async create(createUsuarioDto: Promise<Usuario>) {
    const usuario = new this.usuarioModel(CreateUsuarioDto);
    return await usuario.save();
  }
  async updateUsuario(usuarioID: string, createUsuarioDto: CreateUsuarioDto) {
    console.log({ usuarioID, createUsuarioDto });
    try {
      const updatedUsuario = await this.usuarioModel.findByIdAndUpdate(usuarioID, createUsuarioDto, { new: true });

      if (!updatedUsuario) {
        return {
          success: false,
          data: [],
        };
      }
      const res = {
        success: true,
        data: updatedUsuario,
      };
      console.log(res);
      return res;
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
