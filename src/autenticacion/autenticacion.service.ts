import { Injectable } from "@nestjs/common";
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import { UpdateAutenticacionDto } from "./dto/update-autenticacion.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Autenticacion } from "./interfaces/autenticacion.interface";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class AutenticacionService {
  constructor(
    @InjectModel("Autenticacion") private readonly autenticacionModel: Model<Autenticacion>,
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
      const usuario = await this.autenticacionModel.findOne({ rut: rut, contrasena: contrasena }).populate("usuario_id");
      if (!usuario) {
        return {
          success: false,
          data: [],
        };
      }

      const payload = {
        sub: usuario._id,
        rut: usuario.usuario_id.rut,
        nombre: usuario.usuario_id.nombre,
        apellido: usuario.usuario_id.apellido,
        email: usuario.usuario_id.email,
        rol: usuario.usuario_id.rol,
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
  async findOne(id: string) {
    try {
      const autenticacion = await this.autenticacionModel.findById(id).populate("usuario_id");
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
