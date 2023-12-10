import { Module } from "@nestjs/common";
import { WsLogicaService } from "./ws-logica.service";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { WebsocketService } from "src/websocket/websocket.service";

@Module({
  providers: [
    // WsLogicaService,
    // WebsocketGateway, WebsocketService
  ],
})
export class WsLogicaModule {}
