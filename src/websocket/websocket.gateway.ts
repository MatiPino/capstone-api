import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { WebsocketService } from "./websocket.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway(81, { cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  afterInit(server: any) {
    console.log("Esto se ejecuta cuando incia el servidor");
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit("init", `Bienvenido tu ID es ${client.id}`)
    console.log({ mensaje: "cliente conectado", id: client.id });
    this.websocketService.registrarCliente(client);
    this.server.on("event", (data) => {
      return data;
    });
    this.server.emit('userStatusChanged', { userId: client.id, isOnline: true });
    console.log(this.websocketService.getClientes());
  }
  
  handleDisconnect(client: any) {
    console.log({ mensaje: "cliente desconectadotado", id: client.id });
    this.websocketService.eliminarCliente(client.id);
    this.server.emit('userStatusChanged', { userId: client.id, isOnline: false });
  }

  @SubscribeMessage('seleccionarUsuario')
  handleSeleccionarUsuario(client: Socket, payload: any) {
    console.log(`Usuario ${client.id} seleccionó a ${payload.selectedUserId}`);
    // Emite el evento 'seleccionarUsuario' para informar a otros clientes
    this.server.emit('seleccionarUsuario', { selectedUserId: payload, selectedByUserId: client.id });
    console.log(payload);
    console.log(client.id);
    
  }

  @SubscribeMessage("event")
  handleEvent(client: any, payload: any): string {
    console.log(payload);
    this.server.emit("event", payload);
    return "Hello world!";
  }
  
  @SubscribeMessage("venderProducto")
  venderProducto(client: any, payload: any): string {
    this.server.emit("venderProducto", payload);
    return payload;
  }

  // Intento implementacion de mensajes //
  
  @SubscribeMessage('mensaje')
  handleMensaje(client: Socket, payload: any) {
    console.log(`Mensaje recibido de ${client.id}: ${payload.mensaje}`);
    
    // Asegúrate de que el evento "mensaje" se emita solo una vez
    if (payload && payload.mensaje) {
      this.server.emit('mensaje', payload);
    }
  }
}
