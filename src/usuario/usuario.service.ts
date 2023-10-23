import { Injectable } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Usuario } from "./interfaces/usuario.interface";
import { Autenticacion } from "src/autenticacion/interfaces/autenticacion.interface";
import { Rol } from "src/rol/interfaces/rol.interface";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>,
    @InjectModel("Rol") private readonly rolModel: Model<Rol>
  ) {}

  async createUsuario(createUsuarioDTO: CreateUsuarioDto): Promise<Usuario> {
    const usuario = new this.usuarioModel(createUsuarioDTO);
    return await usuario.save();
  }

  async crear(body: any) {
    try {
      const existeAut = await this.autenticacionModel.findOne({ rut: body.rut }).exec();
      console.log(existeAut);
      const rol = await this.rolModel.findOne({ rol: body.rol }).exec();

      // Verifica si el rut ya existe
      if (existeAut) {
        return {
          success: false,
          data: "Este Rut ya existe",
        };
      }

      const autenticacion = new this.autenticacionModel({ rut: body.rut, contrasena: body.contrasena });
      const usuario = new this.usuarioModel({
        nombre: body.nombre,
        apellido: body.apellido,
        rol: rol._id,
        correo: body.correo,
        imagen: body.imagen,
        autentificacion_id: autenticacion._id,
      });

      autenticacion.usuario = usuario._id;
      usuario.autentificacion = autenticacion._id;
      await autenticacion.save();
      await usuario.save();
      await this.rolModel.findByIdAndUpdate(rol._id, { $push: { usuarios: usuario._id } });

      return {
        success: true,
        data: usuario,
      };
    } catch (error) {
      const { code, errors } = error;
      console.log(code);
      if (code === 11000) {
        return {
          success: false,
          data: { error: "Este campo ya existe", value: error.keyValue },
        };
      }

      return {
        success: false,
        data: error.message,
      };
    }
  }

  async findAll() {
    try {
      const usuarios = await this.usuarioModel.find().populate("rol", "-usuarios");
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

  async buscarImagen(id: string) {
    console.log(id);
    try {
      const usuario = await this.usuarioModel.findById(id).select("imagen");
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

  async getUsuario(usuarioID: string) {
    try {
      const usuario = await this.usuarioModel.findById(usuarioID).populate("rol", "-usuarios");
      console.log(usuario);
      return { success: true, data: usuario };
    } catch (error) {
      return { success: false, data: error.message };
    }
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
