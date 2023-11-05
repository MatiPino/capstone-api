import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { WebsocketService } from "./websocket.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway(81, { cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  afterInit(server: any) {
    console.log("Method not implemented.");
  }
  handleConnection(client: Socket, ...args: any[]) {
    // console.log({ mensaje: "cliente conectado", id: client.id });
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
}
