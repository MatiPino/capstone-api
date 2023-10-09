import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './Schema/rol.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class RolService {
  getRol(rolID: any) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('Rol') private readonly rolModel: Model<Rol>) { }
  
  
  async createRol(createRolDTO: CreateRolDto): Promise<Rol> {
    const rol = new this.rolModel(createRolDTO);
    return await rol.save()
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
    try{
      const rol = await this.rolModel.findById(id).populate("rol_id")
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
  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
