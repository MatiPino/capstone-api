import { Injectable } from "@nestjs/common";
import { CreateRegistroDto } from "./dto/create-registro.dto";
import { UpdateRegistroDto } from "./dto/update-registro.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Registro } from "./Schema/registro.schema";
// import { Registro } from "./interfaces/registro.interface";
import { Model } from "mongoose";
import { Comercio } from "src/comercio/interfaces/comercio.interface";
import { Producto } from "src/producto/interfaces/producto.interface";
import { WsLogicaService } from "src/ws-logica/ws-logica.service";

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel("Registro") private readonly registroModel: Model<Registro>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    @InjectModel("Producto") private readonly productoModel: Model<Producto>
  ) // private wss: WsLogicaService
  {}

  async ultimosRegistros(comercioId: string) {
    try {
      const registros = await this.registroModel.find({ id: comercioId }).sort({ createdAt: -1 }).limit(5);
      return {
        success: true,
        estado: "Registros encontrados",
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async getRegistros() {
    try {
      const year = new Date().getFullYear(); // Obtén el año actual

      const registros = await this.registroModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $unwind: "$productos",
        },
        {
          $project: {
            mes: { $month: "$createdAt" }, // Obtén el número del mes
            total: "$productos.total",
          },
        },
        {
          $group: {
            _id: {
              id: "$id",
              mes: "$mes",
            }, // Agrupar por mes
            total: { $sum: "$total" },
          },
        },
        {
          $project: {
            _id: "$_id.id", // Cambiar el nombre de la propiedad '_id.mes' por 'mes
            mes: "$_id.mes",
            total: "$total",
          },
        },
        {
          $sort: { mes: 1 }, // Ordenar por mes ascendente
        },
      ]);

      return {
        success: true,
        estado: "Registros encontrados",
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async productoVendidoMes() {
    const now = new Date();
    const primerDia = new Date(new Date().getFullYear(), now.getMonth(), 1);
    // primerDia.setDate(1);
    try {
      const registros = await this.registroModel.aggregate([
        { $match: { createdAt: { $gte: primerDia, $lte: new Date() } } },
        {
          $unwind: "$productos",
        },
        {
          $group: {
            _id: "$productos.id",
            nombre: { $first: "$productos.nombre" },
            cantidadVendida: { $sum: "$productos.cantidad" },
          },
        },
        {
          $sort: { cantidadVendida: -1 },
        },
      ]);
      console.log("======================================");
      console.log(primerDia);
      console.log("======================================");
      console.log(new Date());
      console.log(new Date().getFullYear());
      console.log(new Date().getMonth());
      console.log(new Date().getDate());
      console.log("======================================");
      console.log(now);
      console.log(now.getFullYear());
      console.log(now.getMonth());
      console.log(now.getDate());
      console.log("======================================");
      console.log(registros);
      console.log("======================================");
      return {
        success: true,
        estado: "Registros encontrados",
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async productoVendidoAnioConMes() {
    const primerDiaDelAnio = new Date(new Date().getFullYear(), 0, 1); // Obtén el primer día del año actual

    try {
      const registros = await this.registroModel.aggregate([
        { $match: { createdAt: { $gte: primerDiaDelAnio, $lte: new Date() } } }, // Filtra registros del año actual
        { $unwind: "$productos" },
        {
          $project: {
            id: "$productos.id",
            nombre: "$productos.nombre",
            total: "$productos.total",
            cantidadVendida: "$productos.cantidad",
            mes: { $month: "$createdAt" }, // Obtén el número del mes
          },
        },
        {
          $group: {
            _id: { id: "$id", mes: "$mes" },
            nombre: { $first: "$nombre" },
            total: { $sum: "$total" },
            cantidadVendida: { $sum: "$cantidadVendida" },
          },
        },
        {
          $sort: { "_id.mes": 1, cantidadVendida: -1 }, // Ordena por mes ascendente y cantidad vendida descendente
        },
        {
          $group: {
            _id: "$_id.mes",
            nombre: { $first: "$nombre" },
            cantidadVendida: { $first: "$cantidadVendida" },
            total: { $first: "$total" },
          },
        },

        {
          $project: {
            mes: "$_id",
            nombre: "$nombre",
            cantidadVendida: "$cantidadVendida",
            total: "$total",
          },
        },
      ]);

      return {
        success: true,
        estado: "Registros encontrados",
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async productoVendidoAnioPrueba() {
    const primerDiaDelAnio = new Date(new Date().getFullYear(), 0, 1); // Obtén el primer día del año actual

    try {
      const registros = await this.registroModel.aggregate([
        { $match: { createdAt: { $gte: primerDiaDelAnio, $lte: new Date() } } }, // Filtra registros del año actual
        { $unwind: "$productos" },
        {
          $project: {
            id: "$productos.id",
            nombre: "$productos.nombre",
            total: "$productos.total",
            cantidadVendida: "$productos.cantidad",
            mes: { $month: "$createdAt" }, // Obtén el número del mes
          },
        },
        {
          $group: {
            _id: { id: "$id", mes: "$mes" },
            nombre: { $first: "$nombre" },
            total: { $sum: "$total" },
            cantidadVendida: { $sum: "$cantidadVendida" },
          },
        },
        {
          $sort: { "_id.mes": 1, cantidadVendida: -1 }, // Ordena por mes ascendente y cantidad vendida descendente
        },
        {
          $group: {
            _id: "$_id.id",
            mes: { $first: "$_id.mes" },
            nombre: { $first: "$nombre" },
            cantidadVendida: { $first: "$cantidadVendida" },
            total: { $first: "$total" },
          },
        },
      ]);

      return {
        success: true,
        estado: "Registros encontrados",
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async compararRegistroPorAnio() {
    try {
      const registros = await this.registroModel.aggregate([
        {
          $unwind: "$productos",
        },
        {
          $project: {
            anio: { $year: "$createdAt" }, // Obtén el número del año
            mes: { $month: "$createdAt" }, // Obtén el número del mes
            total: "$productos.total",
          },
        },
        {
          $group: {
            _id: { anio: "$anio", mes: "$mes" },
            total: { $sum: "$total" },
          },
        },
        {
          $project: {
            _id: "$_id.anio",
            mes: "$_id.mes",
            anio: "$_id.anio",
            total: "$total",
          },
        },
        {
          $group: {
            _id: "$anio",
            data: {
              $push: {
                mes: "$mes",
                total: "$total",
              },
            },
          },
        },
        {
          $sort: { _id: 1 }, // Ordenar por año ascendente
        },
      ]);

      const result = {};
      registros.forEach((registro) => {
        const { _id, data } = registro;
        result[_id] = data;
      });

      return {
        success: true,
        estado: "Registros encontrados",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al obtener los registros",
        data: error.message,
      };
    }
  }

  async create(createRegistroDto) {
    try {
      const data = await this.registroModel.create(createRegistroDto);
      await this.comercioModel.findByIdAndUpdate(createRegistroDto.comercio, { $push: { registros: data._id } });
      for (const producto of createRegistroDto.productos) {
        const productoDb = await this.productoModel.findById(producto.id);
        productoDb.cantidad = productoDb.cantidad - producto.cantidad;
        productoDb.save();
        // this.wss.stockBajo(productoDb);
      }
      return {
        success: true,
        estado: "Registro creado exitosamente",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        estado: "Error al crear el registro",
        data: error.message,
      };
    }
  }

  async update(registro_id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    const updatedRegistro = await this.registroModel.findByIdAndUpdate(registro_id, CreateRegistroDto, { new: true });
    return updatedRegistro;
  }

  async deleteRegistro(registro_id: number): Promise<Registro> {
    const deletedRegistro = await this.registroModel.findByIdAndDelete(registro_id);
    return deletedRegistro;
  }
}
