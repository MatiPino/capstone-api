import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Registro } from './Schema/registro.schema'
import { Model } from 'mongoose';


@Injectable()
export class RegistroService {
   async createRegistro(createRegistroDTO: CreateRegistroDto): Promise<Registro>{
      const registro = new this.registroModel(createRegistroDTO);
      return await registro.save()
   }
 constructor(@InjectModel('Registro') private readonly registroModel: Model<Registro>) {}

 async getRegistros(): Promise<Registro[]> {
    const registro = await this.registroModel.find();
    return registro;
 }

 async getRegistro(registroID: number): Promise<Registro> {
    const registro = await this.registroModel.findById(registroID);
    return registro;
 }

  async create(createRegistroDto: Promise<Registro>) {
    const registro = new this.registroModel(CreateRegistroDto);
    return await registro.save();
     
  }
  async update(registro_id: number, updateRegistroDto: UpdateRegistroDto): Promise <Registro> {
    const updatedRegistro = await this.registroModel.findByIdAndUpdate(registro_id,
    CreateRegistroDto, {new: true});
    return updatedRegistro;
  }

  async deleteRegistro(registro_id: number): Promise<Registro> {
    const deletedRegistro = await this.registroModel.findByIdAndDelete(registro_id);
   return  deletedRegistro;
  }
}