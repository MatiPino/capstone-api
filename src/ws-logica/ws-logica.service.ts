import { Injectable } from "@nestjs/common";
import { Producto } from "src/producto/interfaces/producto.interface";
import { WebsocketGateway } from "src/websocket/websocket.gateway";

@Injectable()
export class WsLogicaService {
  constructor(private readonly wsg: WebsocketGateway) {}

  stockBajo(producto: Producto) {
    const { cantidad, nombre } = producto;
    console.log(cantidad);
    if (cantidad < 5) {
      this.wsg.mensajeStock({
        data: {
          cantidad,
          nombre,
        },
        mensaje: `El producto ${nombre} tiene pocas unidades en stock`,
      });
    }
  }
}
