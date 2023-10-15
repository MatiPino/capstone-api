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

@Injectable()
export class AutenticacionService {
  salOrRounds: number | string = 10;

  constructor(
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>,
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
      const usuario = await this.autenticacionModel.findOne({ rut: rut }).populate("usuario");
      if (!usuario) {
        return {
          success: false,
          data: [],
        };
      }
      // const { contrasena } = usuario;

      const checkContrasena = await bcrypt.compare(contrasena, usuario.contrasena);
      console.log(checkContrasena);
      if (!checkContrasena) {
        return {
          success: false,
          data: "Contraseña incorrecta",
        };
      }

      const payload = {
        sub: usuario._id,
        rut: usuario.rut,
        nombre: usuario.usuario.nombre,
        apellido: usuario.usuario.apellido,
        email: usuario.usuario.email,
        rol: usuario.usuario.rol,
      };
      const token = await this.jwtService.sign(payload, { secret: jwtConstants.secret });
      return {
        success: true,
        data: token,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async crear(body: any) {
    // const { contrasena } = body;
    // try {
    //   const existeAut = await this.autenticacionModel.findOne({ rut: body.rut }).exec();
    //   console.log(existeAut);
    //   const rol = await this.rolModel.findOne({ rol: body.rol }).exec();

    //   // Verifica si el rut ya existe
    //   if (existeAut) {
    //     return {
    //       success: false,
    //       data: "Este Rut ya existe",
    //     };
    //   }
    //   console.log(body.contrasena);
    //   console.log(contrasena);
    //   const contrasenaEncryp = await bcrypt.hash(contrasena, this.salOrRounds);
    //   const autenticacion = new this.autenticacionModel({ rut: body.rut, contrasena: contrasenaEncryp });
    //   const usuario = new this.usuarioModel({
    //     nombre: body.nombre,
    //     apellido: body.apellido,
    //     rol: rol._id,
    //     correo: body.correo,
    //     imagen: body.imagen,
    //     autentificacion_id: autenticacion._id,
    //   });

    //   autenticacion.usuario = usuario._id;
    //   usuario.autentificacion = autenticacion._id;
    //   await autenticacion.save();
    //   await usuario.save();
    //   await this.rolModel.findByIdAndUpdate(rol._id, { $push: { usuarios: usuario._id } });

    //   return {
    //     success: true,
    //     data: usuario,
    //   };
    // } catch (error) {
    //   const { code, errors } = error;
    //   console.log(code);
    //   if (code === 11000) {
    //     return {
    //       success: false,
    //       data: { error: "Este campo ya existe", value: error.keyValue },
    //     };
    //   }

    //   return {
    //     success: false,
    //     data: error.message,
    //   };
    // }
    return "This actions create an autentication";
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

  remove(id: number) {
    return `This action removes a #${id} autenticacion`;
  }
}
