import { Injectable } from "@nestjs/common";
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import { UpdateAutenticacionDto } from "./dto/update-autenticacion.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Autenticacion } from "./interfaces/autenticacion.interface";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

import * as bcrypt from "bcrypt";
import { Usuario } from "src/usuario/interfaces/usuario.interface";
import { Rol } from "src/rol/interfaces/rol.interface";
import { Comercio } from "src/comercio/interfaces/comercio.interface";
import { Payload } from "src/.interfaces/payload.interface";
@Injectable()
export class AutenticacionService {
  salOrRounds: number | string = 10;

  constructor(
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    @InjectModel("Rol") private readonly rolModel: Model<Rol>,
    private jwtService: JwtService
  ) {}
  create(createAutenticacionDto: CreateAutenticacionDto) {
    return "This actions create an autentication";
  }

  async findAll() {
    try {
      const autenticaciones = await this.autenticacionModel.find();
      return {
        success: true,
        data: autenticaciones,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
  async login({ rut, contrasena }) {
    try {
      const usuario = await this.autenticacionModel.findOne({ rut: rut }).populate(["usuario"]);
      const rol = await this.rolModel.findById(usuario.usuario.rol);
      const comercio = await this.comercioModel.findById(usuario.usuario.comercio);
      if (!usuario) {
        return {
          success: false,
          data: [],
        };
      }
      // const { contrasena } = usuario;

      const checkContrasena = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!checkContrasena) {
        return {
          success: false,
          data: "Contraseña incorrecta",
        };
      }

      let payload: Payload;
      if (rol.rol == "cliente") {
        payload = {
          id: usuario.usuario._id,
          rut: usuario.rut,
          nombre: usuario.usuario.nombre,
          apellido: usuario.usuario.apellido,
          correo: usuario.usuario.correo,
          direccion: comercio.direccion || null,
          telefono: comercio.telefono || null,
          comercio: comercio._id || null,
          rol: rol.rol,
        };
      } else {
        payload = {
          id: usuario.usuario._id,
          rut: usuario.rut,
          nombre: usuario.usuario.nombre,
          apellido: usuario.usuario.apellido,
          correo: usuario.usuario.correo,
          rol: rol.rol,
        };
      }
      const token = await this.jwtService.sign(payload);
      return {
        success: true,
        data: { ...payload, token },
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async verificarToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp <= currentTime) {
        return {
          success: false,
          data: "Token expirado",
        };
      }
      return {
        success: true,
        data: payload,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const autenticacion = await this.autenticacionModel.findById(id).populate("usuario");
      return {
        success: true,
        data: autenticacion,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  update(id: number, updateAutenticacionDto: UpdateAutenticacionDto) {
    return `This action updates a #${id} autenticacion`;
  }

  async remove(id: string) {
    try {
      const autenticacion = await this.autenticacionModel.findById(id);

      if (!autenticacion) {
        return {
          success: false,
          data: "Autenticacion no existe",
        };
      }

      const data = await autenticacion.deleteOne();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
}
