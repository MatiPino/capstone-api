import { Injectable } from "@nestjs/common";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rol } from "./interfaces/rol.interface";
import { Autenticacion } from "src/autenticacion/interfaces/autenticacion.interface";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class RolService {
  constructor(
    @InjectModel("Rol") private readonly rolModel: Model<Rol>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>,
    private jwtService: JwtService
  ) {}

  getRol(rolID: any) {
    throw new Error("Method not implemented.");
  }

  async createRol(createRolDTO: CreateRolDto) {
    try {
      const rol = new this.rolModel(createRolDTO);
      const data = await rol.save();

      return {
        success: true,
        estado: "Rol creado exitosamente",
        data: data,
      };
    } catch (error) {
      const { code } = error;
      if (code === 11000) {
        return {
          success: false,
          estado: "Error al crear el rol",
          data: "El rol ya existe",
        };
      }
      return {
        success: false,
        estado: "Error al crear el rol",
        data: error.message,
      };
    }
  }

  async findAll() {
    try {
      const rol = await this.rolModel.find();
      return {
        success: true,
        estado: "Roles encontrados",
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los roles",
        data: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const rol = await this.rolModel.findById(id).populate("rol");
      return {
        success: true,
        estado: "Rol encontrado",
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener el rol",
        data: error.message,
      };
    }
  }

  async todosRol(rol: string) {
    try {
      const rolEncontrado = await this.rolModel
        .findOne({ rol: rol })
        .populate({ path: "usuarios", model: "Usuario", populate: { path: "comercio", model: "Comercio", select: "nombre" } });
      const usuarios = rolEncontrado.usuarios;
      const dataPromises = usuarios.map(async (usuario) => {
        const rut = await this.autenticacionModel.findById(usuario.autentificacion).select("rut");

        return {
          ...usuario._doc,
          rol: rolEncontrado.rol,
          rut: rut.rut,
        };
      });
      const data = await Promise.all(dataPromises);
      return {
        success: true,
        estado: "Usuarios encontrados",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los usuarios",
        data: error.message,
      };
    }
  }

  async todosUsuarios() {
    try {
      const rol = await this.rolModel.aggregate([
        {
          $match: {
            rol: { $ne: "admin" },
          },
        },
        {
          $lookup: {
            from: "usuarios", // El nombre de la colección de usuarios
            localField: "usuarios",
            foreignField: "_id",
            as: "usuariosInfo",
          },
        },
        {
          $unwind: "$usuariosInfo",
        },
        {
          $lookup: {
            from: "autenticacions", // El nombre de la colección de autenticaciones
            localField: "usuariosInfo.autentificacion",
            foreignField: "_id",
            as: "autenticacion",
          },
        },
        {
          $unwind: {
            path: "$autenticacion",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$usuariosInfo._id",
            rol: 1, // Referencia directa al campo "rol" del documento "rol"
            nombre: "$usuariosInfo.nombre",
            apellido: "$usuariosInfo.apellido",
            imagen: "$usuariosInfo.imagen",
            correo: "$usuariosInfo.correo",
            rut: "$autenticacion.rut",
            autentificacion: {
              _id: "$autenticacion._id",
              rut: "$autenticacion.rut",
            },
          },
        },
      ]);

      return {
        success: true,
        estado: "Usuarios encontrados",
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los usuarios",
        data: error.message,
      };
    }
  }
  async chat(req: Request) {
    const token = req.headers.authorization.split(" ")[1];
    const payload: any = this.jwtService.decode(token);
    const rolUsuario = payload.rol;
    try {
      const rol = await this.rolModel.aggregate([
        {
          $match: {
            rol: { $ne: rolUsuario },
          },
        },
        {
          $lookup: {
            from: "usuarios", // El nombre de la colección de usuarios
            localField: "usuarios",
            foreignField: "_id",
            as: "usuariosInfo",
          },
        },
        {
          $unwind: "$usuariosInfo",
        },
        {
          $lookup: {
            from: "autenticacions", // El nombre de la colección de autenticaciones
            localField: "usuariosInfo.autentificacion",
            foreignField: "_id",
            as: "autenticacion",
          },
        },
        {
          $unwind: {
            path: "$autenticacion",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$usuariosInfo._id",
            rol: 1, // Referencia directa al campo "rol" del documento "rol"
            nombre: "$usuariosInfo.nombre",
            imagen: "$usuariosInfo.imagen",
            apellido: "$usuariosInfo.apellido",
            correo: "$usuariosInfo.correo",
            rut: "$autenticacion.rut",
            favorito: "$usuariosInfo.favorito",
            autentificacion: {
              _id: "$autenticacion._id",
              rut: "$autenticacion.rut",
            },
          },
        },
      ]);

      return {
        success: true,
        estado: "Usuarios encontrados",
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los usuarios",
        data: error.message,
      };
    }
  }


  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
