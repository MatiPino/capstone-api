import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './interfaces/publicacion.interface';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';

@Injectable()
export class PublicacionService {
    constructor (
        @InjectModel('Publicacion') private readonly publicacionModel: Model<Publicacion>,
        @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>
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

    async findById(id: string) {
        console.log(id);
        
        try {
            // const publicacion = await this.publicacionModel.findById(id);
            const publicacion = await this.usuarioModel.findById(id).populate('publicacion').select("publicacion").exec();
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
        const { nombre, precio, codigo_barra, categoria, imagen, proveedorId } = createPublicacionDto;
        try {
            const usuario = await this.usuarioModel.findById(proveedorId);
            if (!usuario) {
                return {
                    success: false,
                    data: 'El proveedor no existe'
                };
            }
            const publicacion = new this.publicacionModel({ 
                nombre, 
                precio, 
                codigo_barra, 
                categoria, 
                imagen ,
                proveedorId
            });
            const data = await publicacion.save();
            await usuario.updateOne({ $push: { publicacion: data._id } });
            // await this.usuarioModel.findByIdAndUpdate(proveedorId, { $push: { publicacion: data._id } });
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
