import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { WebsocketService } from "./websocket.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  afterInit(server: any) {
    console.log("Esto se ejecuta cuando incia el servidor");

    this.server.on("event", (data) => {
      return data;
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (this.websocketService.isClienteRegistrado(client.id)) {
      // El cliente ya está registrado, maneja esta situación como prefieras
      console.log(`Cliente con ID ${client.id} ya está conectado`);
      client.disconnect();
    } else {
      client.emit("init", `Bienvenido tu ID es ${client.id}`);
      console.log({ mensaje: "cliente conectado", id: client.id });
      this.websocketService.registrarCliente(client);
      this.server.emit("userStatusChanged", { userId: client.id, isOnline: true });
      console.log(this.websocketService.getClientes());
    }
  }

  handleDisconnect(client: any) {
    this.websocketService.eliminarCliente(client.id);
    this.server.emit("userStatusChanged", { userId: client.id, isOnline: false });
    console.log({ mensaje: "cliente desconectado", id: client.id });
    
  }

  @SubscribeMessage("seleccionarUsuario")
  handleSeleccionarUsuario(client: Socket, payload: any) {
    console.log(`Usuario ${client.id} seleccionó a ${payload.selectedUserId}`);
    // Emite el evento 'seleccionarUsuario' para informar a otros clientes
    this.server.emit("seleccionarUsuario", { selectedUserId: payload, selectedByUserId: client.id });
    console.log(payload);
    console.log(client.id);
  }

  @SubscribeMessage("event")
  handleEvent(client: any, payload: any): string {
    this.server.emit("event", payload);
    return "Hello world!";
  }

  @SubscribeMessage("venderProducto")
  venderProducto(client: any, payload: any): string {
    console.log({ payload });
    this.server.emit("venderProducto", payload);
    return payload;
  }

  // Intento implementacion de mensajes //

  @SubscribeMessage("mensaje")
  handleMensaje(client: Socket, payload: any) {
    console.log(`Mensaje recibido de ${client.id}: ${payload.mensaje}`);

    // Asegúrate de que el evento "mensaje" se emita solo una vez
    if (payload && payload.mensaje) {
      this.server.emit("mensaje", payload);
    }
  }

  @SubscribeMessage("stockBajo")
  mensajeStock(payload: any) {
    console.log(`Mensaje recibido de: ${payload.mensaje}`);
    // Asegúrate de que el evento "mensaje" se emita solo una vez
    this.server.emit("stockBajo", payload);
  }
}
