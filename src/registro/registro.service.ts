import { Injectable } from "@nestjs/common";
import { CreateRegistroDto } from "./dto/create-registro.dto";
import { UpdateRegistroDto } from "./dto/update-registro.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Registro } from "./Schema/registro.schema";
// import { Registro } from "./interfaces/registro.interface";
import { Model } from "mongoose";
import { Comercio } from "src/comercio/interfaces/comercio.interface";
import { Producto } from "src/producto/interfaces/producto.interface";

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel("Registro") private readonly registroModel: Model<Registro>,
    @InjectModel("Comercio") private readonly comercioModel: Model<Comercio>,
    @InjectModel("Producto") private readonly productoModel: Model<Producto>
  ) {}

  async getRegistros() {
    try {
      const registro = await this.registroModel.find();
      return {
        success: true,
        data: registro,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async productoVendidoMes() {
    const primerDia = new Date();
    primerDia.setDate(1);
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
      return {
        success: true,
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
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
        data: registros,
      };
    } catch (error) {
      return {
        success: false,
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
  
      let productoMasVendido = { nombre: "", cantidadVendida: 0, mes: "" };
      let productoMenosVendido = { nombre: "", cantidadVendida: Infinity, mes: "" };
  
      registros.forEach((registro) => {
        if (registro.cantidadVendida > productoMasVendido.cantidadVendida) {
          productoMasVendido.nombre = registro.nombre;
          productoMasVendido.cantidadVendida = registro.cantidadVendida;
          productoMasVendido.mes = registro.mes;
        }
  
        if (registro.cantidadVendida < productoMenosVendido.cantidadVendida) {
          productoMenosVendido.nombre = registro.nombre;
          productoMenosVendido.cantidadVendida = registro.cantidadVendida;
          productoMenosVendido.mes = registro.mes;
        }
      });
      
      console.log("REGISTROS", registros);
      
      console.log(productoMasVendido, "MAS VENDIDO DE", productoMasVendido.mes);
      console.log(productoMenosVendido, "MAS VENDIDO DE", productoMenosVendido.mes);

      return {
        success: true,
        data: registros,
        productoMasVendido: productoMasVendido,
        productoMenosVendido: productoMenosVendido,
        
      };
    } catch (error) {
      return {
        success: false,
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
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async create(createRegistroDto) {
    try {
      console.log(createRegistroDto);
      const data = await this.registroModel.create(createRegistroDto);
      await this.comercioModel.findByIdAndUpdate(createRegistroDto.comercio, { $push: { registros: data._id } });
      for (const producto of createRegistroDto.productos) {
        const productoDb = await this.productoModel.findById(producto.id);
        productoDb.cantidad = productoDb.cantidad - producto.cantidad;
        productoDb.save();
      }
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

  async update(registro_id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    const updatedRegistro = await this.registroModel.findByIdAndUpdate(registro_id, CreateRegistroDto, { new: true });
    return updatedRegistro;
  }

  async deleteRegistro(registro_id: number): Promise<Registro> {
    const deletedRegistro = await this.registroModel.findByIdAndDelete(registro_id);
    return deletedRegistro;
  }
}
