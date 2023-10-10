import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class WebsocketService {
  private clientesConectados = {};

  registrarCliente(cliente: Socket) {
    this.clientesConectados[cliente.id] = cliente;
  }

  eliminarCliente(clienteId: string) {
    delete this.clientesConectados[clienteId];
  }
  getClientes() {
    return Object.keys(this.clientesConectados).length;
  }
}
