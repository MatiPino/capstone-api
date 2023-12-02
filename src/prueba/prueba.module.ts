import { Module } from "@nestjs/common";
import { PruebaService } from "./prueba.service";
import { PruebaController } from "./prueba.controller";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { WebsocketService } from "src/websocket/websocket.service";

@Module({
  controllers: [PruebaController],
  providers: [PruebaService, WebsocketGateway, WebsocketService],
})
export class PruebaModule {}
