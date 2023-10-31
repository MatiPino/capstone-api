import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './interfaces/publicacion.interface';

@Injectable()
export class PublicacionService {
    constructor (
        @InjectModel('Publicacion') private readonly publicacionModel: Model<Publicacion>
    ) {}

    async findAll() {
        try {
            const publicacion = await this.publicacionModel.find();
            return {
                success: true,
                data: publicacion
            };
        } catch (error) {
            return {
                success: false,
                data: error.message
            };
        }
    }

    async crear(createPublicacionDto: CreatePublicacionDto) {
        const { nombre, precio, codigo_barra, categoria, imagen } = createPublicacionDto;
        try {
            const publicacion = new this.publicacionModel({ 
                nombre, 
                precio, 
                codigo_barra, 
                categoria, 
                imagen 
            });
            const data = await publicacion.save();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            return {
                success: false,
                data: error.message
            };
        }
    }

    async update(id: string, updatePublicacionDto: UpdatePublicacionDto) {
        try {
        } catch (error) {}
    }

    remove (id: string) {
        return `This action removes a #${id} publicacion`;
    }
}
