import { Injectable } from "@nestjs/common";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rol } from "./interfaces/rol.interface";
import { Autenticacion } from "src/autenticacion/interfaces/autenticacion.interface";
@Injectable()
export class RolService {
  constructor(
    @InjectModel("Rol") private readonly rolModel: Model<Rol>,
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>
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
        data: data,
      };
    } catch (error) {
      const { code } = error;
      if (code === 11000) {
        return {
          success: false,
          data: "El rol ya existe",
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
      const rol = await this.rolModel.find();
      return {
        success: true,
        data: rol,
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
      const rol = await this.rolModel.findById(id).populate("rol");
      return {
        success: true,
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
  async todosRol(rol: string) {
    try {
      const rolEncontrado = await this.rolModel.findOne({ rol: rol }).populate("usuarios", "-imagen");
      const usuarios = rolEncontrado.usuarios;
      const dataPromises = usuarios.map(async (usuario) => {
        const rut = await this.autenticacionModel.findById(usuario.autentificacion).select("rut");
        console.log({rut, usuario});
        
        return {
          ...usuario._doc,
          rol: rolEncontrado.rol,
          rut: rut.rut,
        };
      });
      const data = await Promise.all(dataPromises);
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
  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
