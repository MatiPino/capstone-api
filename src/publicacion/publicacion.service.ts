import { Injectable } from "@nestjs/common";
import { CreatePublicacionDto } from "./dto/create-publicacion.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Publicacion } from "./interfaces/publicacion.interface";
import { Usuario } from "src/usuario/interfaces/usuario.interface";

@Injectable()
export class PublicacionService {
  constructor(
    @InjectModel("Publicacion") private readonly publicacionModel: Model<Publicacion>,
    @InjectModel("Usuario") private readonly usuarioModel: Model<Usuario>
  ) {}

  async findAll() {
    try {
      const publicacion = await this.publicacionModel.find().populate({ path: "proveedor", select: "nombre apellido correo" });
      const publicacionPrueba = await this.publicacionModel.find();
      console.log(publicacionPrueba);
      return {
        success: true,
        data: publicacion,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener las publicaciones",
        data: error.message,
      };
    }
  }

  async findById(id: string) {
    try {
      const publicacion = await this.publicacionModel.find({ proveedor: id });
      if (!publicacion) {
        return {
          estado: "No se encontraron publicaciones del usuario",
          data: [],
        };
      }
      return {
        success: true,
        data: publicacion,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener las publicaciones",
        data: error.message,
      };
    }
  }

  async filtro(nombre: string | null, categoria: string | null, min: number | null, max: number | null) {
    nombre = nombre == "0" ? null : nombre;
    categoria = categoria == "0" ? null : categoria;
    max = max == 0 || null ? 1000000000 : max;
    console.log(nombre, categoria, min, max);

    try {
      const condicion = {};
      if (nombre) {
        condicion["nombre"] = { $regex: nombre, $options: "i" };
      }
      if (categoria) {
        condicion["categoria"] = { $regex: categoria, $options: "i" };
      }
      if (min && max) {
        condicion["precio"] = { $gte: min, $lte: max };
      }
      const publicacion = await this.publicacionModel.find(condicion).populate("proveedor");
      if (!publicacion) {
        return {
          estado: "No se encontraron publicaciones",
          data: [],
        };
      }
      return {
        success: true,
        data: publicacion,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener las publicaciones",
        data: error.message,
      };
    }
  }

  async buscarPorCategoria(categoria: string) {
    try {
      const publicacion = await this.publicacionModel.find({ categoria: categoria });
      if (!publicacion) {
        return {
          estado: "No se encontraron publicaciones de la categoria",
          data: [],
        };
      }
      return {
        success: true,
        data: publicacion,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener las publicaciones",
        data: error.message,
      };
    }
  }

  async findAllCategorias() {
    try {
      const categorias = await this.publicacionModel.find().select("categoria").distinct("categoria");
      return {
        success: true,
        estado: "Categorias encontradas",
        data: categorias,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener las categorias",
        data: error.message,
      };
    }
  }

  async crear(createPublicacionDto: CreatePublicacionDto) {
    const { nombre, precio, codigo_barra, categoria, imagen, proveedor } = createPublicacionDto;
    try {
      const usuario = await this.usuarioModel.findById(proveedor);
      if (!usuario) {
        return {
          estado: "No se encontró el proveedor",
          data: [],
        };
      }
      const publicacion = new this.publicacionModel({
        nombre,
        precio,
        codigo_barra,
        categoria,
        imagen,
        proveedor,
      });
      const data = await publicacion.save();
      await usuario.updateOne({ $push: { publicacion: data._id } });
      return {
        success: true,
        estado: "Publicación creada exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear la publicación",
        data: error.message,
      };
    }
  }

  async updatePublicacion(id: string, CreatePublicacionDto: CreatePublicacionDto) {
    try {
      const updatePublicacion = await this.publicacionModel.findByIdAndUpdate(id, { ...CreatePublicacionDto }, { new: true });
      if (!updatePublicacion) {
        return {
          estado: "No se encontró la publicación",
          data: [],
        };
      }
      const res = {
        success: true,
        estado: "Publicación actualizada exitosamente",
        data: updatePublicacion,
      };
      return res;
    } catch (error) {
      return {
        success: false,
        estado: "Error al actualizar la publicación",
        data: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const publicacion = await this.publicacionModel.findByIdAndDelete(id);
      return {
        success: true,
        estado: "Publicación eliminada exitosamente",
        data: publicacion,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al eliminar la publicación",
        data: error.message,
      };
    }
  }
}
