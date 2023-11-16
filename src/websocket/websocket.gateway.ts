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

    console.log({ mensaje: "cliente conectado", id: client.id });
    this.websocketService.registrarCliente(client);
    this.server.on("event", (data) => {
      return data;
    });
    console.log(this.websocketService.getClientes());
  }
  
  handleDisconnect(client: any) {
    console.log({ mensaje: "cliente desconectadotado", id: client.id });
    this.websocketService.eliminarCliente(client.id);
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

  private usuariosConectados: { [key: string]: { socket: Socket, nombre: string } } = {};
  private mensajesPorCanal: { [canalId: string]: any[] } = {};

  @SubscribeMessage('enviarMensaje')
  handleEnviarMensaje(client: any, mensaje: any): void {
  const usuario = this.usuariosConectados[client.id];
  if (usuario) {
    const destinatario = mensaje.destinatario;
    const mensajeAEnviar = { emisor: usuario.nombre, destinatario, contenido: mensaje.contenido };

    // Persiste el mensaje en el historial del canal
    if (!this.mensajesPorCanal[destinatario]) {
      this.mensajesPorCanal[destinatario] = [];
    }
    this.mensajesPorCanal[destinatario].push(mensajeAEnviar);

    // Envía el mensaje solo al destinatario seleccionado
    if (this.usuariosConectados[destinatario]) {
      this.usuariosConectados[destinatario].socket.emit('chat', mensajeAEnviar);
      this.server.emit('mensaje', mensajeAEnviar);
    }
  }
}

@SubscribeMessage('recibirMensaje')
  handleRecibirMensaje(client: any, mensaje: any, canalActual: string): void {
  const usuario = this.usuariosConectados[client.id];
  if (usuario) {
    // Actualiza el historial de mensajes del canal actual
    if (!this.mensajesPorCanal[canalActual]) {
      this.mensajesPorCanal[canalActual] = [];
    }
    this.mensajesPorCanal[canalActual].push(mensaje);

    // Emite el mensaje al cliente
    client.socket.emit('chat', mensaje);
  }
}
}
