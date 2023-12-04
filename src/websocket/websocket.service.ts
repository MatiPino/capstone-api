import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { WebsocketGateway } from "./websocket.gateway";

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

  isClienteRegistrado(clientId: string): boolean {
    return clientId in this.clientesConectados;
  }
}
