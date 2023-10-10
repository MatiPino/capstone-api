import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, SubscribeMessage } from "@nestjs/websockets";
import { WebsocketService } from "./websocket.service";
import { Socket } from "socket.io";

@WebSocketGateway({ cors: "*" })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly websocketService: WebsocketService) {}
  afterInit(server: any) {
    console.log("Method not implemented.");
  }
  handleConnection(client: Socket, ...args: any[]) {
    // console.log({ mensaje: "cliente conectado", id: client.id });
    this.websocketService.registrarCliente(client);
    console.log(this.websocketService.getClientes());
  }
  handleDisconnect(client: any) {
    console.log({ mensaje: "cliente desconectado", id: client.id });
    this.websocketService.eliminarCliente(client.id);
  }
  @SubscribeMessage("event")
  handleEvent(client: any, payload: any): string {
    return "Hello world!";
  }
}
