import { Module } from "@nestjs/common";
import { RegistroService } from "./registro.service";
import { RegistroController } from "./registro.controller";
import { RegistroSchema } from "./Schema/registro.schema";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { ComercioSchema } from "src/comercio/schema/comercio.schema";
import { ProductoSchema } from "src/producto/Schema/producto.schema";
import { WsLogicaService } from "src/ws-logica/ws-logica.service";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { WebsocketService } from "src/websocket/websocket.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Registro", schema: RegistroSchema },
      { name: "Comercio", schema: ComercioSchema },
      { name: "Producto", schema: ProductoSchema },
    ]),
  ],
  controllers: [RegistroController],
  providers: [RegistroService, WsLogicaService, WebsocketGateway, WebsocketService],
})
export class RegistroModule {}
