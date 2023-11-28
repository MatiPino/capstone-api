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
        estado: "Usuario creado exitosamente",
        data: usuario,
      };
    } catch (error) {
      const { code, errors } = error;
      if (code === 11000) {
        return {
          success: false,
          estado: "Error al crear el usuario",
          data: { error: "Este campo ya existe", value: error.keyValue },
        };
      }

      return {
        success: false,
        estado: "Error al crear el usuario",
        data: error.message,
      };
    }
  }

  async crearUsuario(body: any) {
    try {
      const data = await this.usuarioModel.create(body);
      return {
        success: true,
        estado: "Usuario creado exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear el usuario",
        data: error.message,
      };
    }
  }

  async findAll() {
    try {
      const usuarios = await this.usuarioModel.find().populate("rol", "-usuarios");
      return {
        success: true,
        estado: "Usuarios encontrados",
        data: usuarios,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los usuarios",
        data: error.message,
      };
    }
  }

  async buscarImagen(rut: string) {
    try {
      const usuario = await this.usuarioModel
        .findOne({})
        .populate({ path: "autentificacion", model: "Autenticacion", match: { rut: rut }, select: "rut" })
        .select("imagen");

      return {
        success: true,
        estado: "Imagen encontrada",
        data: usuario,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener la imagen",
        data: error.message,
      };
    }
  }

  async getUsuario(usuarioID: string) {
    try {
      const usuario = await this.usuarioModel.findById(usuarioID).populate("rol", "-usuarios");
      return {
        success: true,
        estado: "Usuario encontrado",
        data: usuario,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener el usuario",
        data: error.message,
      };
    }
  }

  async create(createUsuarioDto: Promise<Usuario>) {
    const usuario = new this.usuarioModel(CreateUsuarioDto);
    return await usuario.save();
  }

  async updateUsuario(createUsuarioDto: CreateUsuarioDto) {
    try {
      // const rol = await this.rolModel.findOne({ rol: createUsuarioDto.rol }).select("rol").exec();
      const updatedUsuario = await this.usuarioModel.findByIdAndUpdate(createUsuarioDto._id, { ...createUsuarioDto }, { new: true });
      if (!updatedUsuario) {
        return {
          success: false,
          data: [],
        };
      }
      const res = {
        success: true,
        estado: "Usuario actualizado exitosamente",
        data: updatedUsuario,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: "Error al actualizar el usuario",
        data: error.message,
      };
    }
  }
  async remove(id: string) {
    try {
      console.log(id);
      const data = await this.usuarioModel.findById(id).exec();
      await this.autenticacionModel.findByIdAndRemove(data.autentificacion, { lean: true });
      await this.rolModel.updateOne({ usuarios: id }, { $pull: { usuarios: id } });
      const datax = await data.deleteOne();
      return {
        success: true,
        estado: "Usuario eliminado exitosamente",
        data: datax,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al eliminar el usuario",
        data: error.message,
      };
    }
  }
}
