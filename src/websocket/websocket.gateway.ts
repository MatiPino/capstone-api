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
  @SubscribeMessage('enviarMensaje')
  handleEnviarMensaje(client: any, mensaje: any): void {
    const usuario = this.usuariosConectados[client.id];
    if (usuario) {
      const destinatario = mensaje.destinatario;
      const mensajeAEnviar = { emisor: usuario.nombre, destinatario, contenido: mensaje.contenido };
  
      // Envía el mensaje solo al destinatario seleccionado
      if (this.usuariosConectados[destinatario]) {
        this.usuariosConectados[destinatario].socket.emit('chat', mensajeAEnviar);
        this.server.emit('mensaje', mensajeAEnviar);  // Para persistir el mensaje en el backend
      }
    }
    console.log("=============ENVIO===============");
    console.log(mensaje);
    console.log("=============ENVIO===============");
  }
  
  @SubscribeMessage('recibirMensaje')
  handleRecibirMensaje(client: any, mensaje: any): void {
    const usuario = this.usuariosConectados[client.id];
    console.log("============RECIBO==========");
    console.log(mensaje);
    console.log(usuario);
    console.log("============RECIBO==========");
    if (usuario) {
      const remitente = mensaje.remitente;
      console.log(remitente);
      const mensajeAEnviar = { emisor: usuario.nombre, destinatario: remitente, contenido: mensaje.contenido };
      console.log(mensajeAEnviar);
      
      // Envía el mensaje solo al remitente seleccionado
      if (this.usuariosConectados[remitente]) {
        this.usuariosConectados[remitente].socket.emit('chat', mensajeAEnviar);
      }
    }
    console.log("============RECIBO==========");
    console.log(mensaje);
    console.log(usuario);
    
    console.log("============RECIBO==========");
    
  }

// @SubscribeMessage('enviarMensaje')
// handleEnviarMensaje(client: any, mensaje: any): void {
//   const usuario = this.usuariosConectados[client.id];
//   if (usuario) {
//     const destinatario = mensaje.destinatario;
//     const mensajeAEnviar = { emisor: usuario.nombre, destinatario, contenido: mensaje.contenido };

//     // Persiste el mensaje en el historial del canal
//     if (!this.mensajesPorCanal[destinatario]) {
//       this.mensajesPorCanal[destinatario] = [];
//     }
//     this.mensajesPorCanal[destinatario].push(mensajeAEnviar);
//     // Envía el mensaje solo al destinatario seleccionado
//     if (this.usuariosConectados[destinatario]) {
//       this.usuariosConectados[destinatario].socket.emit('chat', mensajeAEnviar);
//       this.server.emit('mensaje', mensajeAEnviar);
//     }
//   }
// }

// @SubscribeMessage('recibirMensaje')
// handleRecibirMensaje(client: any, mensaje: any): void {
//   const usuario = this.usuariosConectados[client.id];
//   if (usuario) {
//     const remitente = mensaje.remitente;

//     // Envía el historial de mensajes al usuario que recibe
//     if (this.mensajesPorCanal[remitente]) {
//       this.mensajesPorCanal[remitente].forEach((msg) => {
//         this.usuariosConectados[client.id].socket.emit('chat', msg);
//       });
//     }
//   }
// }
}
